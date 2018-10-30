class AddAthletesColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :athletes, :first_name, :string, null: false
    add_column :athletes, :last_name, :string, null: false
    add_column :athletes, :latitude, :float, default: nil
    add_column :athletes, :longitude, :float, default: nil
    add_column :athletes, :location, :float, default: nil
  end
end
