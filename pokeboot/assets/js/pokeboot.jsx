import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_pokeboot(root, channel) {
  ReactDOM.render(<PokeBootBattle channel={channel}/>, root);
}

// App state for MemroyGame is:
// {
//    letters: String    // the letters used for the game
//    board: [{ value:x ,status:x }]          // the current board
//    completed: String  // the letters(tiles) that have been completed
//    activeTilePos: int // the position of the current active tile
//    clicks: int        // the number of clicks so far
// }

class PokeBootBattle extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = { };

    this.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp) });

    this.gotView = this.gotView.bind(this);
  }

  gotView(view) {
    console.log("binded");
    this.setState(view.game);
  }

  render() {
    return (
      <h1>Welcome, trainer</h1>
    );
  }
}
