import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { FormattedMessage } from 'react-intl'

import $ from 'jquery';

export default ({post}) => {
    //todo: card text trucation by css
    return (
        <div>
            <Card>
                <CardImg top src={post.thumbnail} style={{maxHeight: '25vw'}}/>
                <CardBody>
                    <CardTitle>{post.title}</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>{$(post.content).text().slice(1,200)}...</CardText>
                </CardBody>
            </Card>
        </div>
    )
}