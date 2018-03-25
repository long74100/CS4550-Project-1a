import React from 'react';
import PropTypes from 'prop-types';
import { Move } from './Move';

export function MovesList({ moves, isEnabled }) {
    let moveDisplay = [];
    if (moves.length == 5) {
        moveDisplay.push(<div key={6} className="col-xs-1 col-sm-1" />)
    }
    moves.forEach((move, index) => moveDisplay.push(<Move key={index} {...move} isEnabled={isEnabled} />))
    return moveDisplay
}

MovesList.propTypes = {
    moves: PropTypes.arrayOf(PropTypes.shape(Move.propTypes)).isRequired,
    isEnabled: PropTypes.bool.isRequired
};