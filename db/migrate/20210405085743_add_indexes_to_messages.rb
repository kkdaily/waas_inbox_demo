class AddIndexesToMessages < ActiveRecord::Migration[6.1]
  def change
    add_index :messages, :created_at
    add_index :messages, :sender_id
    add_index :messages, :receiver_id
    add_index :messages, [:sender_id, :receiver_id]
  end
end
