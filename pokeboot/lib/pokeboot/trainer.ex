# trainer has name, starter, health, and cards
defmodule Pokeboot.Trainer do
  defstruct name:  "", starter: "", health: 100, maxHealth: 100,
    cards: [], status: %{"Stun" => 0, "Burn" => 0, "Freeze" => 0}
end
