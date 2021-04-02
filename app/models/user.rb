class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true

  has_many :candidates
  has_many :founders

  has_many :messages, class_name: 'Message', :foreign_key => "sender_id", :dependent => :delete_all
  has_many :messages, class_name: 'Message', :foreign_key => "receiver_id", :dependent => :delete_all
end
