# trainer has name, starter, health, and cards
defmodule Pokeboot.Trainer do
  defstruct name:  "", starter: "", health: 100, maxHealth: 100, cards: %{}, status: %{}
end
