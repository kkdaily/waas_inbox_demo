class RemoveIsReadFromMessages < ActiveRecord::Migration[6.1]
  def change
    remove_column :messages, :is_read
  end
end
