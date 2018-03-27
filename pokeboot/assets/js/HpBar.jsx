import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import { cardTypes } from './constants';

export function HpBar({ name, health, maxHealth, isOpponent, history }) {
    const smartClasses = isOpponent ? "hp-bar-top row" : "hp-bar-bottom row";
    const regularClasses = "col-5 border border-dark p-2 bg-white rounded text-dark hp-bar-filler";

    const displayCards = [];
    history.forEach((card, index) => displayCards.push(
        <img className="col-xs-2 col-sm-2 col-md-2 col-lg-2 p-1" key={index} src={cardTypes[card]} />)
    )

    const leftside = !isOpponent ?
        <Fragment>
            <div className="col-5">
                {displayCards}
            </div>
            <div className="col-2" />
        </Fragment>
        : null;

    const rightside = isOpponent ?
        <Fragment>
            <div className="col-2" />
            <div className="col-5">
                {displayCards}
            </div>
        </Fragment>
        : null;

    return (
        <div className={smartClasses}>
            {leftside}
            <div className={regularClasses}>
                <span>{name}</span>
                <Progress className="hp-bar-empty" color="33e737" value={health * 100 / maxHealth} />
                <div className="text-right">{health} / {maxHealth}</div>
            </div>
            {rightside}
        </div >
    );
}

HpBar.propTypes = {
    name: PropTypes.string.isRequired,
    health: PropTypes.number.isRequired,
    maxHealth: PropTypes.number.isRequired,
    isOpponent: PropTypes.bool,
    history: PropTypes.array
};