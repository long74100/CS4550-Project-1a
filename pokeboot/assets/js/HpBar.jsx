import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

export function HpBar({ currentHp, maxHp, isOpponent }) {
    let currentClasses = isOpponent ? "float-left" : "float-right";
    return (
        <div>
            <Progress value={currentHp * 100 / maxHp} />
            <div className={currentClasses}>{currentHp} / {maxHp}</div>
        </div>
    );
}

HpBar.propTypes = {
    currentHp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    isOpponent: PropTypes.bool.isRequired
};
