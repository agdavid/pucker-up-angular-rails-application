class CreateBreweries < ActiveRecord::Migration[5.0]
  def change
    create_table :breweries do |t|
      t.string :name
      t.integer :state_id

      t.timestamps null: false
    end
  end
end
