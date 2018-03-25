defmodule Pokeboot.Battle do
  alias Pokeboot.Trainer
  alias Pokeboot.Cards

  def new() do
    %{trainer1: %Trainer{}, trainer2: %Trainer{}, turn: 0, turns: 0}
  end

  def client_view(battle) do
    opponentInfo = battle.trainer2
    %{trainer: battle.trainer1, opponent: battle.trainer2, turn: battle.turn, turns: battle.turns}
  end

  def loadTrainer(battle, payload) do
    trainer = payload["name"]

    if trainer == battle.trainer1.name || trainer == battle.trainer2.name do
      battle
    else
      case battle do
        %{trainer1: %Trainer{name: ""}} ->
          battle
          |> Map.put(:trainer1, %Trainer{name: payload["name"], starter: payload["starter"]})
          |> (fn x ->
                Map.put(
                  x,
                  :trainer1,
                  x.trainer1
                  |> Map.put(:cards, Cards.generateHand(x.trainer1.starter))
                )
              end).()

        %{trainer1: _, trainer2: %{name: ""}} ->
          battle
          |> Map.put(:trainer2, %Trainer{name: payload["name"], starter: payload["starter"]})
          |> (fn x ->
                Map.put(
                  x,
                  :trainer2,
                  x.trainer2
                  |> Map.put(:cards, Cards.generateHand(x.trainer2.starter))
                )
              end).()

        _ ->
          battle
      end
    end
  end

  def attack(battle, payload) do
    trainerName = payload["trainer"]
    cardId = payload["card"]

    if trainerName == battle.trainer1.name do
      trainer = battle.trainer1
    else
      trainer = battle.trainer2
    end

    battle
  end
end
