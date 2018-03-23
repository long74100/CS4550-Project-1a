import React from 'react';
import ReactDOM from 'react-dom';
import { Wait } from './Wait';
import { HpBar } from './HpBar';

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
      hpBarProps: { maxHp: 150, currentHp: 20, isOpponent: false }
    };
    return (
      <div>
        <h1>Welcome, trainer</h1>
        {/* <Wait {...this.props.Wait} /> */}
        {/* <HpBar {...this.props.hpBarProps} /> */}
        <Wait {...fakeData.waitProps} />
        <HpBar {...fakeData.hpBarProps} />
      </div>
    );
  }
}
