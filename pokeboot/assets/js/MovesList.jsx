import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Move } from './Move';

export function MovesList({ moves, isEnabled, moveOnClick }) {
    let moveDisplay = [];
    if (moves.length != 6) {
        const additionalBuffer = 6 - moves.length;
        const bufferClasses = `col-xs-${additionalBuffer} col-sm-1${additionalBuffer}`
        moveDisplay.push(<div key={6} className={bufferClasses} />)
    }

    moves.forEach((move, index) => moveDisplay.push(
        <Move
            {...move}
            key={index}
            isEnabled={isEnabled}
            moveOnClick={() => moveOnClick(index)}
        />))

    const animateClasses = isEnabled ? "animated infinite bounce slow-bounce" : ""
    const displayRowClasses = animateClasses + " row"
    return (
        <Fragment>
            <div className="col-12 text-center"><h3>{isEnabled ? "Your Turn" : "Opponents Turn"}</h3></div>
            <div className={displayRowClasses}>{moveDisplay}</div>
        </Fragment>
    )
}

MovesList.propTypes = {
    moves: PropTypes.arrayOf(PropTypes.shape(Move.propTypes)).isRequired,
    isEnabled: PropTypes.bool.isRequired,
    moveOnClick: PropTypes.func.isRequired
};