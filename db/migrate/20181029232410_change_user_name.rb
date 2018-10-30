class ChangeUserName < ActiveRecord::Migration[5.2]
  def change
    rename_table :users, :athletes
  end
end
