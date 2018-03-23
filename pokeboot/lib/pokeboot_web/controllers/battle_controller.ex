defmodule PokebootWeb.BattleController do
  use PokebootWeb, :controller

  def battle(conn, params) do
    render conn, "battle.html", battle: params["battle"]
  end
end
