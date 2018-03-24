import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export function Move({ type, typeId, value }) {
    return (
        <div className="col-lg-3 text-center text-dark">
            <Card>
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