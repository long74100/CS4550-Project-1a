import React from 'react';
import PropTypes from 'prop-types';
import { HpBar } from './HpBar';
import { Move } from './Move';
import { MovesList } from './MovesList';

export function Start({ opponent, trainer, turn }) {
    const trainerName = sessionStorage.getItem("trainer");
    const isThisTrainer = trainerName == trainer.name
    const displayCards = isThisTrainer ? trainer.cards : opponent.cards
    const opponentProps = isThisTrainer ? opponent : trainer
    const trainerProps = isThisTrainer ? trainer : opponent

    const isEnabled = (isThisTrainer && turn === 0) || (!isThisTrainer && turn === 1)
    return (
        <div>
            <HpBar isOpponent={true} {...opponentProps} />
            <div className="row all-cards">
                <MovesList moves={displayCards} isEnabled={isEnabled} />
            </div>
            <HpBar isOpponent={false} {...trainerProps} />
        </div>
    );
}

Start.propTypes = {
    opponent: PropTypes.shape(HpBar.propTypes).isRequired,
    trainer: PropTypes.shape(HpBar.propTypes).isRequired,
    turn: PropTypes.number.isRequired
};