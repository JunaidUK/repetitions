class Api::V1::SportsController < ApplicationController
  before_action :authenticate_athlete!

  def index
    render json: Sport.all
  end


end
