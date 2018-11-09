class SignupSerializer < ActiveModel::Serializer
  attributes :id, :practice_id, :athlete_id

  belongs_to :athlete
  belongs_to :practice
end
