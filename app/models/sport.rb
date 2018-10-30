class Sport < ApplicationRecord
  validates_presence_of :name

  has_many :exercises
  has_many :athletes, through: :exercises
end
