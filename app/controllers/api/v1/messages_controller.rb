class Api::V1::MessagesController < ApplicationController
  before_action :authorized

  # GET /conversations
  def index
    user_id = session[:user_id]
    search = params[:search]
    offset = params[:offset]
    is_candidate = User.is_candidate?(user_id)

    messages = Message.messages_sent_or_received_by_user(user_id)

    filtered_messages = messages
      .filter_by_company_name(search)
      .or(messages.filter_by_content(search))
      .or(messages.filter_by_user_name(search))

    if is_candidate
      grouped_messages = filtered_messages.most_recent.group('founders.user_id')
    else
      grouped_messages = filtered_messages.most_recent.group('candidates.user_id')
    end

    latest_messages = messages
      .order_by_latest_message(grouped_messages)
      .limit(10)
      .offset(offset)
    
    if is_candidate
      @conversations = latest_messages.candidate_conversation_info
    else
      @conversations = latest_messages.founder_conversation_info
    end

    render json: @conversations
  end

  # GET /conversations/:user_id
  def show
    user_id = session[:user_id]
    founder_id = params[:id]
    interlocutor_id = params[:id]

    conversation = Message.conversation_between_users(user_id, interlocutor_id)
    message_thread = conversation.message_thread_info.order(:created_at)
    company = conversation.company_info.first
    candidate = conversation.candidate_info.first

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
