class AddSenderAndReceiverColumnsToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column(:messages, :sender_id, :uuid, null: false)
    add_column(:messages, :receiver_id, :uuid, null: false)
  end
end
