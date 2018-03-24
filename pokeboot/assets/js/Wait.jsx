import React from 'react';
import PropTypes from 'prop-types';
export function Wait({ userName }) {
    return (
        <div className="d-flex justify-content-center wait text-center">
            <div>
                <h1>Welcome, {userName}</h1>
                <h3>Please wait for opponent!</h3>
            </div>
        </div>
    );
}

Wait.propTypes = {
    userName: PropTypes.string.isRequired
};