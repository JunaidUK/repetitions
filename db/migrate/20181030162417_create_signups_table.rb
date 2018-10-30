class CreateSignupsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :signups do |t|
      t.belongs_to :athlete, null: false
      t.belongs_to :practice, null: false
      t.boolean :owner, default: false
      
      t.timestamps null: false
    end
  end
end
