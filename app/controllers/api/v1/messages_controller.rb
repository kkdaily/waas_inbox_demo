class Api::V1::MessagesController < ApplicationController
  before_action :authorized

  def is_founder?(user_id)
    Founder.where(user_id: user_id).exists?
  end

  def is_candidate?(user_id)
    Candidate.where(user_id: user_id).exists?
  end

  # GET /conversations
  def index
    user_id = session[:user_id]
    search = params[:search]
    offset = params[:offset]
    is_candidate = is_candidate?(user_id)
     
    # get all messages where the current user has sent or received
    tables = Message.joins("
      INNER JOIN founders 
      ON (founders.user_id = messages.sender_id OR founders.user_id = messages.receiver_id)
    ")
    .joins("
      INNER JOIN companies 
      ON companies.id = founders.company_id
    ")
    .joins("
      INNER JOIN candidates
      ON (candidates.user_id = messages.sender_id OR candidates.user_id = messages.receiver_id)
    ")
    .joins("
      INNER JOIN users
      ON candidates.user_id = users.id
    ")
  
    # get all messages where the current user was either the sender or receiver
    user_messages = tables.sent_by_user(user_id).or(tables.received_by_user(user_id))

    # filter messages by query text
    filtered_messages = user_messages.filter_by_company_name(search)
      .or(user_messages.filter_by_content(search))
      .or(user_messages.filter_by_user_name(search))

    if is_candidate
      # group most recent messages by founder
      grouped_messages = filtered_messages.most_recent.group('founders.user_id')
    else
      # group most recent messages by candidate
      grouped_messages = filtered_messages.most_recent.group('candidates.user_id')
    end

    latest_messages = tables.where(created_at: grouped_messages.pluck('MAX(messages.created_at)')).order(last_message_sent_at: :desc)

    paginated_messages = latest_messages.limit(10).offset(offset)
    
    if is_candidate
      @conversations = paginated_messages.select("
        LEFT(messages.content, 30) as clipped_message, companies.logo_url as profile_image_url, 
        companies.name as name, messages.created_at as last_message_sent_at, founders.user_id as id
      ")
    else
      @conversations = paginated_messages.select("
        LEFT(messages.content, 30) AS clipped_message, users.profile_image_url, 
        CONCAT(users.first_name, ' ', users.last_name) AS name, 
        messages.created_at AS last_message_sent_at, candidates.user_id AS id
      ")
    end

    render json: @conversations
  end

  # GET /conversations/:user_id
  def show
    user_id = session[:user_id]
    founder_id = params[:id]
    interlocutor_id = params[:id]

    # sanitize 
    @interlocutor_id = ActiveRecord::Base.connection.quote(interlocutor_id)
    @user_id = ActiveRecord::Base.connection.quote(user_id)

    tables = Message
      .joins("INNER JOIN users ON (users.id = messages.sender_id)")
      .joins("INNER JOIN founders ON (founders.user_id = #{@interlocutor_id} OR founders.user_id = #{@user_id})")
      .joins("INNER JOIN candidates ON (candidates.user_id = #{@interlocutor_id} OR candidates.user_id = #{@user_id})")
      .joins("INNER JOIN companies ON companies.id = founders.company_id")

    messages = tables
      .where(sender_id: user_id, receiver_id: interlocutor_id)
      .or(tables.where(sender_id: interlocutor_id, receiver_id: user_id))

    message_thread = messages.select("
      messages.id as id, messages.sender_id as sender_id, messages.content as content,
      users.first_name as sender_first_name, users.last_name as sender_last_name,
      users.profile_image_url as sender_profile_image_url, messages.created_at as sent_at
    ").order(:created_at)

    company = messages.select("
      companies.id, name, batch, website_url, logo_url, size, industry, location
    ").first

    candidate = messages.select("
      candidates.id, first_name, last_name, profile_image_url, candidates.status
    ").first

    @conversations = {
      :messages_data => message_thread,
      :company_data => company,
      :candidate => candidate
    }

    render json: @conversations
  end

  # POST /messages
  def create
    user_id = session[:user_id]

    @message = Message.new(message_params)
    @message.sender_id = user_id

    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

    def message_params
      params.require(:message).permit(:content, :receiver_id)
    end
end
