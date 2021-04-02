class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true

  has_many :candidates
  has_many :founders

  has_many :messages, class_name: 'Message', :foreign_key => "sender_id", :dependent => :delete_all
  has_many :messages, class_name: 'Message', :foreign_key => "receiver_id", :dependent => :delete_all

  scope :is_candidate, -> (user_id) {
    Candidate.where(user_id: user_id).exists?
  }

  scope :is_founder, -> (user_id) {
    Founder.where('founders.user_id = ?', user_id).exists?
  }
end
