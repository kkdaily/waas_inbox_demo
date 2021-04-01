class CreateFounders < ActiveRecord::Migration[6.1]
  def change
    create_table :founders, id: :uuid do |t|
      t.timestamps
    end

    add_reference :founders, :users, null: false, foreign_key: true, type: :uuid
    add_reference :founders, :companies, null: false, foreign_key: true, type: :uuid
  end
end
