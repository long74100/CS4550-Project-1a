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

    this.channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => { console.log("Unable to join", resp) });

    this.channel.push("attack", { trainer: this.channel.params.name, card: 1 })
      .receive("ok", this.gotView.bind(this));


    this.gotView = this.gotView.bind(this);
  }

  gotView(view) {
    this.setState(view.battle);
    this.setState({ isLoaded: true })
  }

  render() {
    if (!this.state.isLoaded) {
      return (<div><h1>Loading Game!</h1></div>);
    }

    const state = this.state;

    const gameStarted = state.opponent.name != "";
    return (
      <div>
        {gameStarted ? <Start {...state} /> : <Wait userName={state.trainer.name} />}
      </div>
    );
  }
}
