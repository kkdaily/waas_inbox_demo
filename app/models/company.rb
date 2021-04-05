class Company < ApplicationRecord
  has_many :founders

  VALID_INDUSTRIES = ['B2B Software', 'Consumer', 'Education', 'Healthcare', 'Financial Technology', 'Real Estate & Construction', 'Industrials', 'Government', 'Unspecified']

  validates :industry, presence: true, inclusion: { in: VALID_INDUSTRIES }
  validates :name, presence: true, length: { minimum: 1, maximum: 50 }
  validates :website_url, length: { minimum: 3, maximum: 63 }
  validates :location, presence: true
  validates :size, presence: true
  validates :batch, length: { maximum: 3 }
end
