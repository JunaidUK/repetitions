class Athlete < ApplicationRecord
  has_many :exercises
  has_many :sports, through: :exercises
  
  has_many :signups
  has_many :practices, through: :signups

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

end
