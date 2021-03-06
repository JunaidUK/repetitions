class Signup < ApplicationRecord
  validates_uniqueness_of :practice_id, :scope => :athlete_id

  belongs_to :athlete
  belongs_to :practice
end
