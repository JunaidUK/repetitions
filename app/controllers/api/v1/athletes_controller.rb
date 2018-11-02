class Api::V1::AthletesController < ApplicationController

  def index
    render json: Athlete.find(current_athlete.id)
  end

  def update
    @athlete = Athlete.find(athlete_edit_params["id"])
    @athlete.latitude = athlete_edit_params["latitude"]
    @athlete.longitude = athlete_edit_params["longitude"]
    if @athlete.save
      render json: @athlete
      else
      render interfaces_path
    end
  end



def athlete_edit_params
  params.require(:athlete).permit(:id,:latitude,:longitude)
end

end
