class Game < ActiveRecord::Base
# Remember to create a migration!
  has_many :game_players
  has_many :players, through: :game_players
  validates_length_of :players, maximum: 2
end
