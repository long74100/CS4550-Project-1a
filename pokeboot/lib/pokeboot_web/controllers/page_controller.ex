defmodule PokebootWeb.PageController do
  use PokebootWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def battle(conn, params) do
    render conn, "battle.html", battle: params["battle"]
  end
end
