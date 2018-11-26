class Api::V1::PracticesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_athlete!

  def index
    render json: Practice.all
  end

  def create
    @practice = Practice.new(practice_params)
    @practice.athlete_id = current_athlete.id
    if @practice.save
      signup = Signup.new
      signup.athlete_id = current_athlete.id
      signup.practice_id = @practice.id
      signup.owner = true
      signup.save
      render json: @practice
    else
      redirect_to "/"
    end
  end

  private

  def practice_params
    params.require(:practice).permit(:location, :latitude, :longitude, :date_time, :sport_id)
  end


end
