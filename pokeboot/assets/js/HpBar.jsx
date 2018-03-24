import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

export function HpBar({ userName, currentHp, maxHp, isOpponent }) {
    const smartClasses = isOpponent ? "" : "offset-7 hp-bar-bottom";
    const regularClasses = "col-5 border border-dark p-2 bg-white rounded text-dark hp-bar-filler";
    const currentClasses = smartClasses + " " + regularClasses;

    return (
        <div className="row">
            <div className={currentClasses}>
                <span>{userName}</span>
                <Progress className="hp-bar-empty" color="33e737" value={currentHp * 100 / maxHp} />
                <div className="text-right">{currentHp} / {maxHp}</div>
            </div>
        </div>
    );
}

HpBar.propTypes = {
    userName: PropTypes.string.isRequired,
    currentHp: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    isOpponent: PropTypes.bool.isRequired
};