import React, { Component } from 'react';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';

import PlaceHandler from './place_handler';
import PlaceDateEditor from '../components/event_date_editor';
import CKEditor from '../components/external/ck_editor';
import FileUploader from '../components/file_uploader';

class EventEditor extends Component{
    render() {
        return (
            <Container>
                <FileUploader />
                <PlaceDateEditor />
                <PlaceHandler />
                <Row>
                    <Col>
                        <CKEditor />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EventEditor;