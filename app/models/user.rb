class User < ApplicationRecord
  before_save { username.downcase! }
  has_secure_password

  has_many :candidates, dependent: :destroy
  has_many :founders, dependent: :destroy
  has_many :messages, class_name: 'Message', :foreign_key => "sender_id", dependent: :destroy
  has_many :messages, class_name: 'Message', :foreign_key => "receiver_id", dependent: :destroy

  VALID_USERNAME_REGEX = /[\w]+/
  VALID_NAME_REGEX = /[A-Za-z]+/

  validates :username, presence: true, uniqueness: true, length: { minimum: 1, maximum: 10 }, format: { with: VALID_USERNAME_REGEX }
  validates :password, presence: true, length: { minimum: 6 }
  validates :first_name, presence: true, length: { minimum: 1, maximum: 20 }, format: { with: VALID_NAME_REGEX }
  validates :last_name, presence: true, length: { minimum: 1, maximum: 20 }, format: { with: VALID_NAME_REGEX }
end
