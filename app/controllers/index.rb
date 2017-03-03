get '/' do
  erb :index
end

get '/init' do
  erb :login
end


get '/play' do
  if Player.find_by(name: params[:p1]) == nil
    play1 = Player.create(name: params[:p1])
    p play1
  else
    play1 = Player.find_by(name: params[:p1])
  end

  if Player.find_by(name: params[:p2]) == nil
    play2 = Player.create(name: params[:p2])
  else
    play2 = Player.find_by(name: params[:p2])
  end

  @game = Game.create
  @game_player = GamePlayer.create(game_id: @game.id, player_id: play1.id)
  @game_player = GamePlayer.create(game_id: @game.id, player_id: play2.id)

  erb :play
end

post '/result' do
  game_id = params[:game_id]
  win = params[:winner].to_i
  score_p1 = params[:score_p1]
  score_p2 = params[:score_p2]

  game = Game.find_by(id: game_id.to_i)
  players = GamePlayer.where(game_id: game_id)

  if win == 0
    game.update(winner: "igual de loosers", play1: 0, play2: 0)
  elsif win == 1
    game.update(winner: "empataron, que loosers", play1: score_p1, play2: score_p2)
  elsif win == 2
    player = Player.find_by(id: players[1].player_id)
    game.update(winner: player.name, play1: score_p1, play2: score_p2)
  elsif win == 3
    player = Player.find_by(id: players[0].player_id)
    game.update(winner: player.name, play1: score_p1, play2: score_p2)
  end
      
end