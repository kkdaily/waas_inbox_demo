class CreateConversations < ActiveRecord::Migration[6.1]
  def change
    create_table :conversations, id: :uuid do |t|
      t.uuid :company_id
      t.uuid :candidate_id

      t.timestamps
    end

    add_foreign_key :conversations, :companies, column: :company_id
    add_foreign_key :conversations, :users, column: :candidate_id

    add_reference :messages, :conversation, null: false, foreign_key: true, type: :uuid
  end
end
