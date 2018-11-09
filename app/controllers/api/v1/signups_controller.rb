class Api::V1::SignupsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_athlete!

  def create
    signup = Signup.new
    signup.athlete_id = current_athlete.id
    signup.practice_id = signup_params[:practice_id]
    if signup.save
      render json: signup
    else
      redirect '/'
    end
  end

  def index
    @athlete = Athlete.find(current_athlete.id)
    @athlete_practices = @athlete.practices
    render json: @athlete_practices
  end

  private

  def signup_params
    params.require(:signup).permit(:practice_id)
  end
end
