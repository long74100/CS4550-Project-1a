defmodule PokebootWeb.BattlesChannel do
  use PokebootWeb, :channel
  alias Pokeboot.BattleRooms
  alias Pokeboot.Battle

  def join("battles:" <> name, payload, socket) do
    if authorized?(payload) do
      battle = (BattleRooms.load(name) || Battle.new())
              |> Battle.loadTrainer(payload)

      BattleRooms.save(name, battle)
      {:ok, %{"join" => name, "battle" => Battle.client_view(battle)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (battles:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
