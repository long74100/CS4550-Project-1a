import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { cardTypes } from './constants';

export function Move({ type, id, value, turns }) {
    return (
        <div className="col-xs-2 col-sm-2 p-3 text-center text-dark">
            <Card>
                <CardImg top width="100%" src={cardTypes[id]} alt="Card image cap" />
                <CardBody className="move">
                    <CardTitle>{type}</CardTitle>
                    <CardSubtitle>{value}. In effect for : {turns} turn</CardSubtitle>
                    <Button>Use</Button>
                </CardBody>
            </Card>
        </div>
    );
}

Move.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    turns: PropTypes.number.isRequired
};