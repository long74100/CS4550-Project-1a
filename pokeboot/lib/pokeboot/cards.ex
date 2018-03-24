defmodule Pokeboot.Cards do
  alias Pokeboot.Card
  def generateHand(starter) do
    cards = [%Card{type: "Attack", id: 1, value: 10}, %Card{type: "Heal", id: 2, value: 20},
     %Card{type: "Strong Attack", id: 3, value: 15}, %Card{type: "Burn", id: 4, value: 10, turns: 2},
      %Card{type: "Freeze", id: 5, value: 0, turns: 2}, %Card{type: "Stun", id: 6, value: 1}]

    if starter == "blue-starter" do
      1..6
      |> Enum.map(fn x -> generateCard(Enum.random(0..100), cards) end)
    else
      1..5
      |> Enum.map(fn x -> generateCard(Enum.random(0..100), cards) end)
    end
  end

  def generateCard(rand, cards) when rand in 1..70 do
    cards
    |> Enum.at(0)
  end
  def generateCard(rand, cards) when rand in 71..90 do
    cards
    |> Enum.at(1)
  end
  def generateCard(rand, cards) when rand in 91..93 do
    cards
    |> Enum.at(2)
  end
  def generateCard(rand, cards) when rand in 91..93 do
    cards
    |> Enum.at(3)
  end
  def generateCard(rand, cards) do
    cards
    |> Enum.at(4)
  end
end
