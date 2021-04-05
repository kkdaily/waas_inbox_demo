class AddIndexesToFounders < ActiveRecord::Migration[6.1]
  def change
    add_index :founders, :user_id
    add_index :founders, :company_id
  end
end
