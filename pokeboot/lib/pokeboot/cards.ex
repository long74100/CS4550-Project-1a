defmodule Pokeboot.Cards do
  alias Pokeboot.Card

  def cards() do
    [
      %Card{type: "Attack", id: 0, value: 10},
      %Card{type: "Heal", id: 1, value: 20},
      %Card{type: "S. Atk.", id: 2, value: 15},
      %Card{type: "Burn", id: 3, value: 10, turns: 2},
      %Card{type: "Freeze", id: 4, value: 0, turns: 2},
      %Card{type: "Stun", id: 5, value: 1}
    ]
  end

  def generateHand(starter) do
    cards = cards()
    if starter == "blue-starter" do
      1..6
      |> Enum.map(fn x -> generateCard(Enum.random(0..100), cards, starter) end)
    else
      1..5
      |> Enum.map(fn x -> generateCard(Enum.random(0..100), cards, starter) end)
    end
  end

  def generateCard(starter) do
    generateCard(Enum.random(0..100), cards(), starter)
  end

  def generateCard(rand, cards, starter) when rand in 1..45 do
    cards
    |> Enum.at(0)
    |> multiplier(starter)
  end

  def generateCard(rand, cards, _) when rand in 46..55 do
    cards
    |> Enum.at(1)
  end

  def generateCard(rand, cards, starter) when rand in 56..76 do
    cards
    |> Enum.at(2)
    |> multiplier(starter)
  end

  def generateCard(rand, cards, _) when rand in 77..84 do
    cards
    |> Enum.at(3)
  end

  def generateCard(rand, cards, _) when rand in 85..92 do
    cards
    |> Enum.at(4)
  end

  def generateCard(_, cards, _) do
    cards
    |> Enum.at(5)
  end

  def multiplier(card, starter) do
    newCard =
      if starter == "yellow-starter" do
        card
        |> Map.put(:value, card.value * 1.1)
      else
        card
      end
    newCard
  end
end
