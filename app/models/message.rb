class Message < ApplicationRecord
  belongs_to :user, class_name: 'User', :foreign_key => "sender_id"
  belongs_to :user, class_name: 'User', :foreign_key => "receiver_id"

  validates :content, presence: true, length: { minimum: 1 }
  validates :receiver_id, presence: true
  validates :sender_id, presence: true
end
