class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies, id: :uuid do |t|
      t.string :logo_url
      t.string :name
      t.string :website_url
      t.string :location
      t.integer :size
      t.string :batch
      t.string :industry
      t.string :twitter_url
      t.string :facebook_url

      t.timestamps
    end
  end
end
