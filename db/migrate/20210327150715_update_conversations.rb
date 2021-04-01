class UpdateConversations < ActiveRecord::Migration[6.1]
  def change
    remove_column :conversations, :company_id
    remove_column :conversations, :candidate_id

    add_reference :conversations, :founders, null: false, foreign_key: true, type: :uuid
    add_reference :conversations, :candidates, null: false, foreign_key: true, type: :uuid
  end
end
