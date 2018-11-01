class AthleteSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :latitude, :longitude

  has_many :equipments

  has_many :exercises
  has_many :sports, through: :exercises

  has_many :signups
  has_many :practices, through: :signups


end
