import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Move } from './Move';

export function MovesList({ moves, isEnabled }) {
    let moveDisplay = [];
    if (moves.length == 5) {
        moveDisplay.push(<div key={6} className="col-xs-1 col-sm-1" />)
    }
    moves.forEach((move, index) => moveDisplay.push(<Move key={index} {...move} isEnabled={isEnabled} />))
    return (
        <Fragment>
            <div className="col-12 text-center"><h3>{isEnabled ? "Your Turn" : "Opponents Turn"}</h3></div>
            <div className="row">{moveDisplay}</div>
        </Fragment>
    )
}

MovesList.propTypes = {
    moves: PropTypes.arrayOf(PropTypes.shape(Move.propTypes)).isRequired,
    isEnabled: PropTypes.bool.isRequired
};