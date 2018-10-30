class ChangeTableName < ActiveRecord::Migration[5.2]
  def change
    rename_table :excercises, :exercises
  end
end
