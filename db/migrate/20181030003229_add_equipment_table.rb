class AddEquipmentTable < ActiveRecord::Migration[5.2]
  def change
    create_table :equipment do |t|
      t.belongs_to :athlete, null: false
      t.string :name, null: false
    end
  end
end
