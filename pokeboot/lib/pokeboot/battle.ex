defmodule Pokeboot.Battle do
  alias Pokeboot.Trainer
  def new() do
    %{  trainer1: %Trainer{},
        trainer2: %Trainer{},
        turn: 0,
        turns: 0
      }
  end

  def loadTrainer(battle, payload) do
    IO.inspect battle

    newTrainer = payload["name"]
    IO.puts newTrainer
    if newTrainer == battle.trainer1.name
    || newTrainer == battle.trainer2.name do
      IO.puts "already in battle"
      battle
    else
      case battle do
        %{trainer1: %Trainer{name: ""}, trainer2: _, turn: _, turns: _} ->
          battle
          |> Map.put(:trainer1, %Trainer{ name: payload["name"]})
        %{trainer1: _, trainer2: %{ name: ""}, turn: _, turns: _} ->
          battle
          |> Map.put(:trainer2, %Trainer{ name: payload["name"]})
        _ ->
          battle
      end
    end

  end

end
