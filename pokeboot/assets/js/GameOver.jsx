

import React from 'react';
import PropTypes from 'prop-types';
export function GameOver({ userName }) {
    return (
        <div className="d-flex justify-content-center wait text-center">
            <div>
                <h1>Game Over! Winner : {userName}</h1>
                <Button onClick={() => window.location.replace("/")}>Use</Button>
            </div>
        </div >
    );
}

GameOver.propTypes = {
    userName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};