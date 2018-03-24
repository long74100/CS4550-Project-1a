import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

export function HpBar({ userName, currentHp, maxHp, isOpponent }) {
    const smartClasses = isOpponent ? "text-left" : "text-right";
    const regularClasses = "";
    const currentClasses = smartClasses + " " + regularClasses;
    return (
        <div className="border border-dark p-2 bg-white rounded text-dark">
            <span>{userName}</span>
            <Progress value={currentHp * 100 / maxHp} />
            <div className={currentClasses}>{currentHp} / {maxHp}</div>
        </div>
    );
}

HpBar.propTypes = {
    userName: PropTypes.string.isRequired,
    currentHp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    isOpponent: PropTypes.bool.isRequired
};
