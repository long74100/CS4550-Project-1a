import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { cardTypes } from './constants';

export function Move({ type, typeId, value }) {
    return (
        <div className="col-xs-2 col-sm-2 p-3 text-center text-dark">
            <Card>
                <CardImg top width="100%" src={cardTypes[1]} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{type}</CardTitle>
                    <CardSubtitle>{value}</CardSubtitle>
                    <Button>Use</Button>
                </CardBody>
            </Card>
        </div>
    );
}

Move.propTypes = {
    type: PropTypes.string.isRequired,
    typeId: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};