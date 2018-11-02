class Api::V1::ExercisesController < ApplicationController

  def create
    @exercise = Exercise.new(exercise_params)
    if @exercise.save
      render json: Sport.find(exercise_params[:sport_id])
    else
      redirect_to "/interfaces/1/edit"
    end
  end

  private

  def exercise_params
    params.require(:exercise).permit(:sport_id,:athlete_id)
  end
end
