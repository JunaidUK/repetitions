class CreateSportsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :sports do |t|
      t.string :name, null: false

      t.timestamps null: false
    end

    add_index :sports, :name, unique: true
  end
end
