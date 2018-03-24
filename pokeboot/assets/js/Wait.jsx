import React from 'react';
import PropTypes from 'prop-types';
export function Wait(props) {
    let text = props.userName + " please wait for opponent!";
    return (
        <div>
            <p>{text}</p>
        </div>
    );
}

Wait.propTypes = {
    userName: PropTypes.string.isRequired
};