class Practice < ApplicationRecord
  has_many :signups
  has_many :athletes, through: :signups
end
