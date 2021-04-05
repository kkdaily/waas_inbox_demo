class Candidate < ApplicationRecord
  belongs_to :user

  # Job search status
  VALID_STATUSES = ['active', 'passive', 'inactive']

  validates :user_id, presence: true
  validates :status, presence: true, inclusion: { in: VALID_STATUSES }
end
