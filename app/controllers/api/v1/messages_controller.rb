class Api::V1::MessagesController < ApplicationController
  before_action :authorized

  def is_candidate(user_id)
    Candidate.where(user_id: user_id).exists?
  end

  def is_founder(user_id)
    Founder.where(user_id: user_id).exists?
  end

  # GET /conversations
  def index
    user_id = session[:user_id]
    search = "%#{params[:search]}%"
    offset = params[:offset]

    # if the logged in user is a candidate, get all messages where the candidate has sent/received it
    # grouped by company 
    if is_candidate(user_id)

      @conversations = Message.find_by_sql(["
        SELECT 
        LEFT(m.content, 30) as clipped_message, comp.logo_url as company_logo_url, 
            comp.name as company_name, m.created_at as last_message_sent_at, f.user_id as id
        FROM messages as m

        INNER JOIN founders AS f 
        ON (f.user_id = m.sender_id OR f.user_id = m.receiver_id)
        INNER JOIN companies as comp 
        ON comp.id = f.company_id

        WHERE m.created_at IN
        (
          SELECT MAX(m.created_at)
          FROM messages AS m
          INNER JOIN founders AS f 
          ON (f.user_id = m.sender_id OR f.user_id = m.receiver_id)
          INNER JOIN companies as comp 
          ON comp.id = f.company_id
          WHERE (m.receiver_id = :user_id OR m.sender_id = :user_id)
          AND (comp.name ILIKE :search OR m.content ILIKE :search)
          GROUP BY comp.id
          LIMIT 10
          OFFSET :offset
        ) 
        ORDER BY m.created_at DESC
      ", {
        :user_id => user_id,
        :search => search,
        :offset => offset
      }])

    # if the logged in user is a founder, get all messages where the founder has sent/received it
    # grouped by candidate
    elsif is_founder(user_id)

      @conversations = Message.find_by_sql(["
        SELECT * FROM 
        (
          SELECT DISTINCT ON (can.user_id)
          LEFT(m.content, 30) as clipped_message, u.profile_image_url as company_logo_url, 
            CONCAT(u.first_name, ' ', u.last_name) as company_name, m.created_at as last_message_sent_at, can.user_id as id
          FROM messages AS m
          INNER JOIN candidates AS can
          ON (can.user_id = m.sender_id OR can.user_id = m.receiver_id)
          INNER JOIN founders as f
          ON f.user_id = :user_id
          INNER JOIN users AS u
          ON can.user_id = u.id
          INNER JOIN companies as comp 
          ON comp.id = f.company_id
          WHERE (m.receiver_id = :user_id OR m.sender_id = :user_id)
          AND (u.first_name ILIKE :search OR u.last_name ILIKE :search OR m.content ILIKE :search)
          ORDER BY can.user_id
          LIMIT 10
          OFFSET :offset
        ) 
        AS conversations 
        ORDER BY conversations.last_message_sent_at DESC
      ", {
        :user_id => user_id,
        :search => search,
        :offset => offset
      }])

    else 
      puts "invalid user role"
    end

    render json: @conversations
  end

  # GET /conversations/:id
  def show
    user_id = session[:user_id]
    founder_id = params[:id]
    interlocutor_id = params[:id]

    # get all messages between 2 users
    @conversation = Message.find_by_sql(["
      SELECT conversation.messages_data, conversation.company_data FROM (
        SELECT 
        json_agg(
          json_build_object(
            'id', messages.id,
            'sender_id', messages.sender_id,
            'content', messages.content,
            'sender_first_name', users.first_name,
            'sender_last_name', users.last_name,
            'sender_profile_image_url', users.profile_image_url,
            'sent_at', messages.created_at
          ) 
          ORDER BY messages.created_at
        ) 
        AS messages_data,
        json_build_object(
          'name', MIN(companies.name),
          'batch', MIN(companies.batch),
          'website_url', MIN(companies.website_url),
          'logo_url', MIN(companies.logo_url),
          'size', MIN(companies.size),
          'industry', MIN(companies.industry),
          'location', MIN(companies.location)
        ) 
        AS company_data
        FROM messages
        INNER JOIN users
        ON (users.id = messages.sender_id)
        INNER JOIN founders
        ON (founders.user_id = :interlocutor_id OR founders.user_id = :user_id)
        INNER JOIN companies
        ON companies.id = founders.company_id
        WHERE 
        (
          (messages.sender_id = :user_id AND messages.receiver_id = :interlocutor_id)
          OR
          (messages.sender_id = :interlocutor_id AND messages.receiver_id = :user_id)
        ) 
      ) conversation
      ", {
      :user_id => user_id,
      :interlocutor_id => interlocutor_id # user_id of person logged in user is talking to
    }])

    render json: @conversation[0]
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
