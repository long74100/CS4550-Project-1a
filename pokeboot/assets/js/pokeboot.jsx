import React from 'react';
import ReactDOM from 'react-dom';
import { Wait } from './Wait';
import { Start } from './Start';

export default function run_pokeboot(root, channel) {
  ReactDOM.render(<PokeBootBattle channel={channel} />, root);
}

class PokeBootBattle extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      isLoaded: false,
    };

    this.channel.on("refresh", (game) => {
      this.setState(game);
    });

    this.gotView = this.gotView.bind(this)

    this.channel.join()
      .receive("ok", this.gotView)
      .receive("error", resp => { console.log("Unable to join", resp) });
  }

  gotView(view) {
    this.setState(view.battle);
    this.setState({ isLoaded: true })
  }

  render() {
    if (!this.state.isLoaded) {
      return (<div><h1>Loading Game!</h1></div>);
    }

    this.gotView = this.gotView.bind(this)

    let moveOnClick = (x) => {
      this.channel.push("move", { trainerName: this.channel.params.name, cardIndex: x })
        .receive("ok", this.gotView);
    }

    const state = this.state;
    state.moveOnClick = moveOnClick
    const gameStarted = state.opponent.name != "";
    return (
      <div>
        {gameStarted ? <Start {...state} /> : <Wait userName={state.trainer.name} />}
      </div>
    );
  }
}
