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
    IO.inspect battle
    trainer = payload["name"]
    starter = payload["starter"]
    if trainer == battle.trainer1.name || trainer == battle.trainer2.name do
      battle
    else
      case battle do
        %{trainer1: %Trainer{name: ""}} ->
          battle
          |> Map.put(:trainer1, %Trainer{name: trainer, starter: starter})
          |> (fn battle -> generateTrainer(battle, :trainer1, battle.trainer1, battle.trainer1.starter) end).()

        %{trainer1: _, trainer2: %{name: ""}} ->
          battle
          |> Map.put(:trainer2, %Trainer{name: trainer, starter: starter})
          |> (fn battle -> generateTrainer(battle, :trainer2, battle.trainer2, battle.trainer2.starter) end).()
          |> startBattle(Enum.random(0..1));
        _ ->
          battle
      end
    end
  end

  def generateTrainer(battle, key, trainer, starter) do
    battle
    |> Map.put(key, trainer
                    |> Map.put(:cards, Cards.generateHand(starter)))
  end

  def startBattle(battle, 0) do
    battle
    |> Map.put(:turn, 0)
  end
  def startBattle(battle, 1) do
    battle
    |> Map.put(:turn, 1)
  end

  def move(battle, payload) do
    trainerName = payload["trainerName"]
    cardIndex = payload["cardIndex"]

    if trainerName == battle.trainer1.name do
      key = :trainer1
      trainer = battle.trainer1
      opponent = battle.trainer2
    else
      key = :trainer2
      trainer = battle.trainer2
      opponent = battle.trainer1
    end

    {cardUsed, cards} = trainer.cards
                        |> List.pop_at(cardIndex)

    if cardUsed.id == 1 do
      trainer = trainer |> useCardOn(cardUsed)
      IO.inspect trainer
    else
      opponent = opponent |> useCardOn(cardUsed)
      IO.puts "--------------------"
      IO.inspect opponent
      IO.puts "--------------------"

    end



    battle
  end

  def useCardOn(trainer, card) do
    hp = trainer.health
    if (card.id == 1) do
      hp = trainer.health + card.value
      if hp > trainer.maxHealth do
        hp = trainer.maxHealth
      end
    end

    if (card.id == 0 || card.id == 3) do
      hp = trainer.health - card.value
    end
    trainer
    |> Map.put(:health, hp)

  end


end
