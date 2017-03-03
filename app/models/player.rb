class Player < ActiveRecord::Base
  validates_uniqueness_of :name, :message => "Haaaacker! Haaaacker! player already in use"
  validates_presence_of :name, :message => "f*ck you!! inscribe your player, dont´be lazy"

# Remember to create a migration!

  has_many :game_players
  has_many :games, through: :game_players
end
