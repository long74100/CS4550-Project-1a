import React from 'react';
import PropTypes from 'prop-types';
import { HpBar } from './HpBar';
import { Move } from './Move';
import { MovesList } from './MovesList';

export function Start({ opponent, trainer, turn, moveOnClick, gameLog }) {
    const trainerName = sessionStorage.getItem("trainer");
    const isThisTrainer = trainerName == trainer.name
    const displayCards = isThisTrainer ? trainer.cards : opponent.cards
    const opponentProps = isThisTrainer ? opponent : trainer
    const trainerProps = isThisTrainer ? trainer : opponent

    const trainer1 = gameLog.trainer1.splice(-5);
    const trainer2 = gameLog.trainer2.splice(-5);

    const opponentHistory = isThisTrainer ? trainer2 : trainer1
    const trainerHistory = isThisTrainer ? trainer1 : trainer2

    opponentHistory.reverse()

    const isEnabled = (isThisTrainer && turn === 0) || (!isThisTrainer && turn === 1)

    let centerRow = null;
    if (trainer.name === trainerName || trainerName === opponent.name) {
        centerRow = (
            <div className="row all-cards">
                <MovesList moves={displayCards} isEnabled={isEnabled} moveOnClick={moveOnClick} />
            </div>
        )
    }

    return (
        <div>
            <HpBar isOpponent={true} {...opponentProps} history={opponentHistory} />
            {centerRow}
            <HpBar isOpponent={false} {...trainerProps} history={trainerHistory} />
        </div>
    );
}

Start.propTypes = {
    opponent: PropTypes.shape(HpBar.propTypes).isRequired,
    trainer: PropTypes.shape(HpBar.propTypes).isRequired,
    turn: PropTypes.number.isRequired,
    moveOnClick: PropTypes.func.isRequired
};