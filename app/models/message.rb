class Message < ApplicationRecord
  belongs_to :user, class_name: 'User', :foreign_key => "sender_id"
  belongs_to :user, class_name: 'User', :foreign_key => "receiver_id"

  validates :content, presence: true, length: { minimum: 1 }
  validates :receiver_id, presence: true
  validates :sender_id, presence: true

  scope :sent_by, -> (user_id) {
    joins(:users).where(messages: {
      sender_id: user_id
    })
  }

  scope :received_by, -> (user_id) {
    joins(:users).where(messages: {
      receiver_id: user_id
    })
  }

end
