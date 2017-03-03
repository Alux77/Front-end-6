class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :play1
      t.string :play2
    end

    add_index(:players, :name, :unique => true)
  end
end
