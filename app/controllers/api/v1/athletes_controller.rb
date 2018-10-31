class Api::V1::AthletesController < ApplicationController
  before_action :authenticate_athlete!

  def index
    render json: Athlete.find(current_athlete.id)
  end


end
