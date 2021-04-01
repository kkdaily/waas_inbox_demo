class Company < ApplicationRecord
  has_many :founders

  VALID_INDUSTRIES = ['B2B Software', 'Consumer', 'Education', 'Healthcare', 'Financial Technology', 'Real Estate & Construction', 'Industrials', 'Government', 'Unspecified']

  validates :industry, inclusion: { in: VALID_INDUSTRIES }
end
