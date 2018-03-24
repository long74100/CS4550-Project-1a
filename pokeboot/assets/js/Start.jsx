import React from 'react';
import PropTypes from 'prop-types';
import { HpBar } from './HpBar';
import { Move } from './Move';

export function Start({ opponent, moveProps, trainer }) {
    return (
        <div>
            <HpBar {...opponent} />
            <div className="row all-cards">
                <Move {...moveProps} />
                <Move {...moveProps} />
                <Move {...moveProps} />
                <Move {...moveProps} />
                <Move {...moveProps} />
                <Move {...moveProps} />
            </div>
            <HpBar {...trainer} />
        </div>
    );
}

Start.propTypes = {
    opponent: PropTypes.shape(HpBar.propTypes).isRequired,
    moveProps: PropTypes.shape(Move.propTypes).isRequired,
    trainer: PropTypes.shape(HpBar.propTypes).isRequired,

};