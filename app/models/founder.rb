class Founder < ApplicationRecord
  belongs_to :user
  belongs_to :company

  validates :user_id, presence: true
  validates :company_id, presence: true
end
