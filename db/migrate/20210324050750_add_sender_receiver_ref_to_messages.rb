class AddSenderReceiverRefToMessages < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :messages, :users, column: :sender_id, type: :uuid
    add_foreign_key :messages, :users, column: :receiver_id, type: :uuid
  end
end
