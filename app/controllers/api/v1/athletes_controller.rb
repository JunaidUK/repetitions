class Api::V1::AthletesController < ApplicationController

  def index
    render json: Athlete.find(current_athlete.id)
  end


end
