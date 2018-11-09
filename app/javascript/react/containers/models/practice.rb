class Practice < ApplicationRecord
  has_many :signups
  has_many :athletes, through: :signups

  belongs_to :sport
end
