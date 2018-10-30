class CreateTableAthleteSports < ActiveRecord::Migration[5.2]
  def change
    create_table :excercises do |t|
      t.belongs_to :athlete, null: false
      t.belongs_to :sport, null: false

      t.timestamps null: false
    end
  end
end
