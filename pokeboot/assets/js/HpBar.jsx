import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

export function HpBar({ name, health, maxHealth, isOpponent }) {
    const smartClasses = isOpponent ? "hp-bar-top" : "offset-7 hp-bar-bottom";
    const regularClasses = "col-5 border border-dark p-2 bg-white rounded text-dark hp-bar-filler";
    const currentClasses = smartClasses + " " + regularClasses;

    return (
        <div className="row">
            <div className={currentClasses}>
                <span>{name}</span>
                <Progress className="hp-bar-empty" color="33e737" value={health * 100 / maxHealth} />
                <div className="text-right">{health} / {maxHealth}</div>
            </div>
        </div>
    );
}

HpBar.propTypes = {
    name: PropTypes.string.isRequired,
    health: PropTypes.number.isRequired,
    maxHealth: PropTypes.number.isRequired,
    isOpponent: PropTypes.bool
};