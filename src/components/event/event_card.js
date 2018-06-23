import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { FormattedMessage } from 'react-intl'

import $ from 'jquery';

export default ({event}) => {
    return (
        <div>
            <Card>
                <CardImg top width="100%" src={event.thumbnail} />
                <CardBody>
                    <CardTitle>{event.heading}</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>{$(event.content).text().slice(1,200)}...</CardText>
                </CardBody>
            </Card>
        </div>
    )
}