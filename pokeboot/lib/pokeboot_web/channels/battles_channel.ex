defmodule PokebootWeb.BattlesChannel do
  use PokebootWeb, :channel
  alias Pokeboot.BattleRooms
  alias Pokeboot.Battle

  def join("battles:" <> name, payload, socket) do
    if authorized?(payload) do
      battle = (BattleRooms.load(name) || Battle.new())
               |> Battle.isBattleOver()
               |> Battle.loadTrainer(payload)

      socket = socket
               |> assign(:battle, battle)
               |> assign(:name, name)

      client_battle = Battle.client_view(battle)
      send(self(), {"informAll", client_battle})
      BattleRooms.save(name, battle)

      {:ok, %{"join" => name, "battle" => client_battle}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info({"informAll", client_battle}, socket) do

    broadcast!(socket, "refresh", client_battle)
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("move", payload, socket) do
    battle = BattleRooms.load(socket.assigns[:name])

    newBattle = battle
             |> Battle.move(payload)


    BattleRooms.save(socket.assigns[:name], newBattle)

    send(self(), {"informAll", Battle.client_view(newBattle)})

    {:reply, {:ok, %{"battle" => Battle.client_view(newBattle)}}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (battles:lobby).
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
