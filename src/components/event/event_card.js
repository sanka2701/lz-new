import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { FormattedMessage } from 'react-intl'

import $ from 'jquery';

export default ({event}) => {
    return (
        <div>
            <Card>
                <CardImg top src={event.thumbnail} style={{maxHeight: '25vw'}}/>
                <CardBody>
                    <CardTitle>{event.title}</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>{$(event.content).text().slice(1,200)}...</CardText>
                </CardBody>
            </Card>
        </div>
    )
}