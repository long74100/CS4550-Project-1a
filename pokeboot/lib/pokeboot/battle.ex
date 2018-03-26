defmodule Pokeboot.Battle do
  alias Pokeboot.Trainer
  alias Pokeboot.Cards

  def new() do
    %{trainer1: %Trainer{}, trainer2: %Trainer{}, turn: 0, turns: 0, gameOver: false}
  end

  def client_view(battle) do
    opponentInfo = battle.trainer2

    %{
      trainer: battle.trainer1,
      opponent: battle.trainer2,
      turn: battle.turn,
      turns: battle.turns,
      gameOver: battle.gameOver
    }
  end

  def loadTrainer(battle, payload) do
    trainer = payload["name"]
    starter = payload["starter"]

    if trainer == battle.trainer1.name || trainer == battle.trainer2.name do
      battle
    else
      case battle do
        %{trainer1: %Trainer{name: ""}} ->
          battle
          |> Map.put(:trainer1, %Trainer{name: trainer, starter: starter} |> checkElement())
          |> (fn battle ->
                generateTrainer(battle, :trainer1, battle.trainer1, battle.trainer1.starter)
              end).()

        %{trainer1: _, trainer2: %{name: ""}} ->
          battle
          |> Map.put(:trainer2, %Trainer{name: trainer, starter: starter} |> checkElement())
          |> (fn battle ->
                generateTrainer(battle, :trainer2, battle.trainer2, battle.trainer2.starter)
              end).()
          |> startBattle(Enum.random(0..1))

        _ ->
          battle
      end
    end
  end

  def generateTrainer(battle, key, trainer, starter) do
    battle
    |> Map.put(key, trainer |> Map.put(:cards, Cards.generateHand(starter)))
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

    {trainerKey, opponentKey, trainer, opponent} =
      if trainerName == battle.trainer1.name do
        {:trainer1, :trainer2, battle.trainer1, battle.trainer2}
      else
        {:trainer2, :trainer1, battle.trainer2, battle.trainer1}
      end

    {cardUsed, cards} = trainer.cards |> List.pop_at(cardIndex)

    {newTrainer, newOpponent} =
      case cardUsed.id do
        1 -> {trainer |> useCardOn(cardUsed, false), opponent}
        _ -> {trainer, opponent |> useCardOn(cardUsed, trainer.status["Freeze"] > 0)}
      end

    battle
    |> Map.put(
      trainerKey,
      newTrainer |> Map.put(:cards, cards ++ [Cards.generateCard(trainer.starter)])
    )
    |> Map.put(opponentKey, newOpponent)
    |> generateTurn()
  end

  def useCardOn(trainer, card, frozen) do
    {hp, status} =
      case id = card.id do
        1 ->
          {checkHp(trainer.health + card.value, trainer.maxHealth), trainer.status}

        id when id in [0, 2] ->
          if frozen do
            {checkHp(trainer.health - card.value * 0.5), trainer.status}
          else
            {checkHp(trainer.health - card.value), trainer.status}
          end

        _ ->
          {trainer.health, trainer.status |> Map.put(card.type, card.turns)}
      end

    trainer
    |> Map.put(:health, hp)
    |> Map.put(:status, status)
  end

  def generateTurn(battle) do
    newBattle =
      if battle.trainer1.health <= 0 || battle.trainer2.health <= 0 do
        battle
        |> Map.put(:gameOver, true)
      else
        turn =
          case battle.turn do
            0 -> 1
            _ -> 0
          end

        battle
        |> Map.put(:turn, turn)
        |> checkStatus(turn)
        |> Map.put(:turns, battle.turns + 1)
      end

    newBattle
  end

  def checkStatus(battle, 0) do
    battle
    |> checkStatusHelp(battle.trainer1, :trainer1, 1)
  end

  def checkStatus(battle, 1) do
    battle
    |> checkStatusHelp(battle.trainer2, :trainer2, 0)
  end

  def checkStatusHelp(battle, trainer, trainerKey, ifSkipTurn) do
    %{"Stun" => stun, "Burn" => burn, "Freeze" => freeze} = trainer.status

    newTrainer =
      trainer
      |> applyBurn(burn)
      |> applyStun(stun)
      |> applyFreeze(freeze)

    if stun > 0 do
      battle
      |> Map.put(trainerKey, newTrainer)
      |> Map.put(:turn, ifSkipTurn)
    else
      battle
      |> Map.put(trainerKey, newTrainer)
    end
  end

  def applyBurn(trainer, burn) do
    if burn > 0 do
      trainer
      |> Map.put(:health, trainer.health - 10)
      |> Map.put(:status, trainer.status |> Map.put("Burn", burn - 1))
    else
      trainer
    end
  end

  def applyStun(trainer, stun) do
    if stun > 0 do
      trainer
      |> Map.put(:status, trainer.status |> Map.put("Stun", stun - 1))
    else
      trainer
    end
  end

  def applyFreeze(trainer, freeze) do
    if freeze > 0 do
      trainer
      |> Map.put(:status, trainer.status |> Map.put("Freeze", freeze - 1))
    else
      trainer
    end
  end

  def checkHp(hp) do
    if hp < 0 do
      0
    else
      hp
    end
  end

  def checkHp(hp, maxHp) when hp > maxHp do
    maxHp
  end

  def checkHp(hp, _) do
    hp
  end

  def checkElement(trainer) do
    if trainer.starter == "red-starter" do
      trainer
      |> Map.put(:health, 115)
      |> Map.put(:maxHealth, 115)
    else
      trainer
    end
  end
end
