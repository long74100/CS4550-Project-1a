

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export function GameOver({ winner }) {
    return (
        <div className="d-flex justify-content-center wait text-center">
            <div className="animated bounceIn">
                <h1>Game Over! Winner : {winner}</h1>
                <Button color="success" onClick={() => window.location.replace("/")}>Home</Button>
            </div>
        </div >
    );
}

GameOver.propTypes = {
    winner: PropTypes.string.isRequired,
};