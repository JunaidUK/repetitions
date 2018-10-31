class Exercise < ApplicationRecord
  belongs_to :athlete
  belongs_to :sport

  validates_uniqueness_of :sport, :scope =>:athlete
end
