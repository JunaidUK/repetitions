class Api::V1::EquipmentsController < ApplicationController

  def create
    @equipment = Equipment.new(equipment_params)
    if @equipment.save
      render json: @equipment
    else
      redirect_to "/interfaces/1/edit"
    end
  end

  private

  def equipment_params
    params.require(:equipment).permit(:name,:athlete_id)
  end
end
