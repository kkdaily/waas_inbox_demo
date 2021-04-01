class UpdateMessages < ActiveRecord::Migration[6.1]
  def change
    remove_column :messages, :receiver_id
    remove_column :messages, :sender_id

    add_column(:messages, :author_id, :uuid, null: false)

    add_foreign_key :messages, :users, column: :author_id, type: :uuid
  end
end
