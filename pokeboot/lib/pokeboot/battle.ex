defmodule Pokeboot.Battle do
  def new() do
    %{  trainer1: {},
        trainer2: {},
        turn: 0,
        turns: 0
      }
  end

  def loadTrainer(battle, payload) do
    IO.inspect battle

    case battle do
      %{trainer1: {}, trainer2: _, turn: _, turns: _} ->
        battle
        |> Map.put(:trainer1, payload)
      %{trainer1: _, trainer2: {}, turn: _, turns: _} ->
        IO.puts "second empty"
      _ ->
        battle
    end
  end
end
