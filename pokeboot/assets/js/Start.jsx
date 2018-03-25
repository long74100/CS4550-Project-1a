import React from 'react';
import PropTypes from 'prop-types';
import { HpBar } from './HpBar';
import { Move } from './Move';
import { MovesList } from './MovesList';

export function Start({ opponent, trainer }) {
    const trainerName = sessionStorage.getItem("trainer");
    const displayCards = trainerName == trainer.name ? trainer.cards : opponent.cards
    const opponentProps = trainerName == trainer.name ? opponent : trainer
    const trainerProps = trainerName == trainer.name ? trainer : opponent
    return (
        <div>
            <HpBar isOpponent={true} {...opponentProps} />
            <div className="row all-cards">
                <MovesList moves={displayCards} />
            </div>
            <HpBar isOpponent={false} {...trainerProps} />
        </div>
    );
}

Start.propTypes = {
    opponent: PropTypes.shape(HpBar.propTypes).isRequired,
    trainer: PropTypes.shape(HpBar.propTypes).isRequired,
};