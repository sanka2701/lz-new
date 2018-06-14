import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';

import PlaceHandler from './place_handler';
import EventDateEditor from '../components/event_date_editor';
import CKEditor from '../components/external/ck_editor';
import FileUploader from '../components/file_uploader';

import HtmlContentPostprocess from '../utils/html_content_postprocess';

class EventEditor extends Component{

    onSubmit(values) {
        // process images
        const processor = new HtmlContentPostprocess();
        processor.postProcess(this.props.eventContent)
            .then(replaced => {
                console.log(replaced)
            });
        // resolve place
        if(!values.place.id) {

        }
        // map values to fit backend api

        // post
    }

    test() {

    }

    renderCKEditor = ({input: {onChange}}) => {
        const onContentChange = (event) => {
            onChange(event.editor.getData());
        };

        return (<CKEditor events={{
            change : onContentChange
        }} />
        )
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Container>
                    {/*<Row>*/}
                        {/*<Col sm='3'>*/}
                            {/*<FileUploader />*/}
                        {/*</Col>*/}
                        {/*<Col sm='9'>*/}
                            {/*<EventDateEditor />*/}
                        {/*</Col>*/}
                    {/*</Row>*/}

                    <EventDateEditor />
                    <PlaceHandler change={this.props.change}/>

                    <button type="submit" >Submit</button>

                    <button type="button" onClick={this.test.bind(this)}>test</button>
                    <Row>
                        <Col>
                            <Field
                                name={'content'}
                                component={this.renderCKEditor}
                            />
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

const selector = formValueSelector('create_event');

function mapStateToProps(state) {
    return {
        // todo: connect to redux, this is just for testing initial form values
        // initialValues: {
        //     time: {
        //         startDay: Date.now()
        //     }
        //     ,
        //     place: {
        //         label: 'Liptovsky Hradok',
        //         lat: '49.09725059408648',
        //         lon: '19.625701904296875'
        //     }
        // },
        eventContent: selector(state, 'content')
    }
}

export default compose(
    connect(mapStateToProps, {}),
    reduxForm({form: 'create_event', validate})
)(EventEditor);