class AddIsReadColumnToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column(:messages, :is_read, :bool, default: false)
  end
end
