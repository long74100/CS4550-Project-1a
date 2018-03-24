import React from 'react';
import ReactDOM from 'react-dom';
import { Wait } from './Wait';
import { HpBar } from './HpBar';
import { Move } from './Move';

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
      hpBarProps: { maxHp: 150, currentHp: 20, isOpponent: false },
      moveProps: {
        type: 'ATTACK',
        typeId: 1,
        value: 10
      }
    };
    return (
      <div>
        <h1>Welcome, trainer</h1>
        {/* <Wait {...this.props.Wait} /> */}
        {/* <HpBar {...this.props.hpBarProps} /> */}
        <div><Wait {...fakeData.waitProps} /></div>
        <div class="d-block p-2 bg-primary text-white"><HpBar {...fakeData.hpBarProps} /></div>
        <div><Move {...fakeData.moveProps} /></div>
      </div>
    );
  }
}
