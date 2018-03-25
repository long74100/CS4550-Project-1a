defmodule Pokeboot.Battle do
  alias Pokeboot.Trainer
  alias Pokeboot.Cards

  def new() do
    %{trainer1: %Trainer{}, trainer2: %Trainer{}, turn: 0, turns: 0, gameOver: FALSE}
  end

  def client_view(battle) do
    opponentInfo = battle.trainer2
    %{trainer: battle.trainer1, opponent: battle.trainer2, turn: battle.turn, turns: battle.turns, gameOver: battle.gameOver}
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
      trainerKey = :trainer1
      opponentKey = :trainer2
      trainer = battle.trainer1
      opponent = battle.trainer2
    else
      trainerKey = :trainer2
      opponentKey = :trainer1
      trainer = battle.trainer2
      opponent = battle.trainer1
    end

    {cardUsed, cards} = trainer.cards
                        |> List.pop_at(cardIndex)

    if cardUsed.id == 1 do
      trainer = trainer |> useCardOn(cardUsed)
    else
      opponent = opponent |> useCardOn(cardUsed)
    end

    battle = battle
    |> Map.put(trainerKey, trainer |> Map.put(:cards, cards))
    |> Map.put(opponentKey, opponent)
    |> generateTurn()
    IO.puts "----------after ttack------------------"
    IO.inspect battle
    IO.puts "----------after ttack------------------"

    battle
  end

  def useCardOn(trainer, card) do
    hp = trainer.health
    status = trainer.status

    case id = card.id do
      1 -> hp = trainer.health + card.value
      id when id in [0, 3] -> hp = trainer.health - card.value
      _ -> status = status
    end

    if hp > trainer.maxHealth do
      hp = trainer.maxHealth
    end

    trainer
    |> Map.put(:health, hp)
    |> Map.put(:status, status)
  end

  def generateTurn(battle) do
    newBattle = battle
    if battle.trainer1.health == 0 || battle.trainer2.health == 0 do
      newBattle = battle
                  |> Map.put(:gameOver, TRUE)
    end



    newBattle
  end


end
