class AddIndexToCandidates < ActiveRecord::Migration[6.1]
  def change
    add_index :candidates, :user_id
  end
end
