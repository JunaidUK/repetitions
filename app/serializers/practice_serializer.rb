class PracticeSerializer < ActiveModel::Serializer
  attributes :id, :date_time, :location

  has_one :sport

  has_many :signups
  has_many :athletes, through: :signups

end
