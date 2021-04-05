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
end
