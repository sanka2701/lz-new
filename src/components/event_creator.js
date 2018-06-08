import React, { Component } from 'react';
import PlacesHandler from '../containers/places_handler';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';

class EventCreator extends Component{

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        Ahoj
                    </Col>
                </Row>
                <PlacesHandler/>
            </Container>
        )
    }
}

export default EventCreator;
