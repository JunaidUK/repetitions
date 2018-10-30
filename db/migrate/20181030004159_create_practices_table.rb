class CreatePracticesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :practices do |t|
      t.float :latitude, default: nil
      t.float :longitude, default: nil
      t.string :location, null: false
      t.string :date
      t.string :time
      t.string :date_time
      t.belongs_to :athlete, null: false
      t.belongs_to :sport
      
      t.timestamps null: false
    end
  end
end
