class DepluralizeForeignKeyReferences < ActiveRecord::Migration[6.1]
  def change
    rename_column :candidates, :users_id, :user_id
    rename_column :conversations, :founders_id, :founder_id
    rename_column :conversations, :candidates_id, :candidate_id
    rename_column :founders, :users_id, :user_id
    rename_column :founders, :companies_id, :company_id
  end
end
