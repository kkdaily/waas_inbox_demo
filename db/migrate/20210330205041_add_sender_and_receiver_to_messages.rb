class AddSenderAndReceiverToMessages < ActiveRecord::Migration[6.1]
  def change
    rename_column :messages, :author_id, :sender_id

    add_column(:messages, :receiver_id, :uuid, null: false)
    add_foreign_key :messages, :users, column: :receiver_id, type: :uuid

    remove_column :messages, :conversation_id
  end
end
