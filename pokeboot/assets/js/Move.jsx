import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { cardTypes } from './constants';

export function Move({ type, id, value, turns, isEnabled, moveOnClick }) {
    const cardContent = isEnabled
        ? (
            <div>
                <CardImg top width="100%" src={cardTypes[id]} />
                <CardBody className="move white-background">
                    <CardTitle>{type}</CardTitle>
                    <CardSubtitle>{value}<br />In effect for : {turns} turn</CardSubtitle>
                    <Button onClick={moveOnClick}>Use</Button>
                </CardBody>
            </div>
        )
        : <CardImg top width="100%" src={cardTypes["cardBack"]} />

    return (
        <div className="col-xs-2 col-sm-2 p-3 text-center text-dark">
            <Card className="transparent">
                {cardContent}
            </Card>
        </div>
    );
}

Move.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    turns: PropTypes.number.isRequired,
    isEnabled: PropTypes.bool,
    moveOnClick: PropTypes.func
};