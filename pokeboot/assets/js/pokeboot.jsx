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
    this.state = {};

    this.channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => { console.log("Unable to join", resp) });

    this.gotView = this.gotView.bind(this);
  }

  gotView(view) {
    this.setState(view.game);
  }

  render() {
    let fakeData = {
      waitProps: { userName: "Ash" },
      trainer: { userName: "Ash", maxHp: 150, currentHp: 20, isOpponent: false },
      opponent: { userName: "Gary", maxHp: 150, currentHp: 40, isOpponent: true },
      moveProps: {
        type: 'ATTACK',
        typeId: 1,
        value: 10
      },
    };
    const gameStarted = !fakeData.opponent.userName == "";
    return (
      <div>
        {gameStarted ? <Start {...fakeData} /> : <Wait {...fakeData.waitProps} />}
      </div>
    );
  }
}
