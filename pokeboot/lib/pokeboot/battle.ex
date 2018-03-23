defmodule Pokeboot.Battle do
  def new() do
    %{  trainer1: {},
        trainer2: {},
        turn: 0,
        turns: 0
      }
  end

  def loadTrainer(battle, payload) do
    newTrainer = payload["trainerName"]
    if newTrainer == battle.trainer1["trainerName"]
    || newTrainer == battle.trainer2["trainerName"] do
      IO.puts "already in battle"
      battle
    else
      case battle do
        %{trainer1: {}, trainer2: _, turn: _, turns: _} ->
          battle
          |> Map.put(:trainer1, payload)
        %{trainer1: _, trainer2: {}, turn: _, turns: _} ->
          battle
          |> Map.put(:trainer2, payload)
        _ ->
          battle
      end
    end

  end
end
