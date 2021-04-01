class UpdateUsersTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :company_id
    rename_column :users, :profile_img_url, :profile_image_url
  end
end
