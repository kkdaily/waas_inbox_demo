class CreateCandidates < ActiveRecord::Migration[6.1]
  def change
    create_table :candidates, id: :uuid do |t|
      t.string :status

      t.timestamps
    end

    add_reference :candidates, :users, null: false, foreign_key: true, type: :uuid
  end
end
