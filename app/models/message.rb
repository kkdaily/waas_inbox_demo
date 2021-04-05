class Message < ApplicationRecord
  belongs_to :user, class_name: 'User', :foreign_key => "sender_id"
  belongs_to :user, class_name: 'User', :foreign_key => "receiver_id"

  validates :content, presence: true, length: { minimum: 1, maximum: 1000 }
  validates :receiver_id, presence: true
  validates :sender_id, presence: true

  scope :sent_by_user, -> (user_id) { where(sender_id: user_id) }

  scope :received_by_user, -> (user_id) { where(receiver_id: user_id) }

  scope :filter_by_content, -> (query) { where("content ILIKE ?", "%#{query}%") }

  scope :filter_by_company_name, -> (query) { where("companies.name ILIKE ?", "%#{query}%") }

  scope :filter_by_user_name, -> (query) { where("first_name ILIKE ?", query).or(where("last_name ILIKE ?", query)) }

  scope :most_recent, -> { select("MAX(messages.created_at)") }

  scope :candidate_conversation_info, -> { 
    select("
      LEFT(messages.content, 130) as clipped_message, companies.logo_url as profile_image_url, 
      companies.name as name, messages.created_at as last_message_sent_at, founders.user_id as id
    ") 
  }
  scope :founder_conversation_info, -> {
    select("
      LEFT(messages.content, 130) AS clipped_message, users.profile_image_url, 
      CONCAT(users.first_name, ' ', users.last_name) AS name, 
      messages.created_at AS last_message_sent_at, candidates.user_id AS id
    ")
  }

  scope :candidate_info, -> { select("candidates.id, first_name, last_name, profile_image_url, candidates.status") }

  scope :company_info, -> { select("companies.id, name, batch, website_url, logo_url, size, industry, location") }

  scope :message_thread_info, -> { 
    select("
      messages.id as id, messages.sender_id as sender_id, messages.content as content,
      users.first_name as sender_first_name, users.last_name as sender_last_name,
      users.profile_image_url as sender_profile_image_url, messages.created_at as sent_at
    ")
  }

  scope :messages_sent_or_received_by_user, -> (user_id) { 
    joins("INNER JOIN founders ON (founders.user_id = messages.sender_id OR founders.user_id = messages.receiver_id)")
    .joins("INNER JOIN companies ON companies.id = founders.company_id")
    .joins("INNER JOIN candidates ON (candidates.user_id = messages.sender_id OR candidates.user_id = messages.receiver_id)")
    .joins("INNER JOIN users ON candidates.user_id = users.id")
    .sent_by_user(user_id)
    .or(Message.received_by_user(user_id))
  }

  scope :order_by_latest_message, -> (messages) {
    where(created_at: messages.pluck('MAX(messages.created_at)'))
    .order(last_message_sent_at: :desc)
  }

  scope :conversation_between_users, -> (user_id, interlocutor_id) {
    # sanitize 
    @interlocutor_id = ActiveRecord::Base.connection.quote(interlocutor_id)
    @user_id = ActiveRecord::Base.connection.quote(user_id)

    joins("INNER JOIN users ON (users.id = messages.sender_id)")
    .joins("INNER JOIN founders ON (founders.user_id = #{@interlocutor_id} OR founders.user_id = #{@user_id})")
    .joins("INNER JOIN candidates ON (candidates.user_id = #{@interlocutor_id} OR candidates.user_id = #{@user_id})")
    .joins("INNER JOIN companies ON companies.id = founders.company_id")
    .where(sender_id: user_id, receiver_id: interlocutor_id)
    .or(Message.where(sender_id: interlocutor_id, receiver_id: user_id))
  }
end
