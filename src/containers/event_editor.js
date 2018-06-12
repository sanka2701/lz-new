import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';

import PlaceHandler from './place_handler';
import EventDateEditor from '../components/event_date_editor';
import CKEditor from '../components/external/ck_editor';
import FileUploader from '../components/file_uploader';

class EventEditor extends Component{

    onSubmit() {

    }

    test(){
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Container>
                    {/*<Field name="firstName" component="input" type="text" placeholder="First Name"/>*/}
                    {/*<FileUploader />*/}
                    <EventDateEditor />
                    <PlaceHandler change={this.props.change}/>

                    <button type="submit" >Submit</button>

                    <button type="button" onClick={this.test.bind(this)}>test</button>
                    <Row>
                        <Col>
                            <CKEditor />
                        </Col>
                    </Row>
                </Container>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    return errors;
}

function mapStateToProps(state) {
    return {
        // todo: connect to redux, this is just for testing initial form values
        initialValues: {
            time: {
                startDay: Date.now()
            }
            ,
            place: {
                label: 'Liptovsky Hradok',
                lat: '49.09725059408648',
                lon: '19.625701904296875'
            }
        }
    }
}

export default compose(
    connect(mapStateToProps, {}),
    reduxForm({form: 'create_event', validate})
)(EventEditor);