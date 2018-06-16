import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Container, Row, Col, Button, Input, Label } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import PlaceHandler from './place_handler';
import EventDateEditor from '../../components/event_date_editor';
import CKEditor from '../../components/external/ck_editor';
import FileUploader from '../../components/ui/file_uploader';
import ErrorSlider from '../../components/ui/error_slider';
import { required } from '../../utils/valdiators';

import HtmlContentPostprocess from '../../utils/html_content_postprocess';

class EventEditor extends Component{

    onSubmit(values) {
        debugger;

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

    renderCKEditor = ({input: {onChange, value}}) => {
        return (
            <CKEditor
                events={{
                    change : (event) => {
                        onChange(event.editor.getData());
                    }
                }}
                content={value}
            />
        )
    };

    renderInput = ({ input, meta }) => {
        return (
            <div>
                <Input {...input} />
                <ErrorSlider
                    errorCode={meta.error}
                    displayed={meta.touched && meta.error}
                />
            </div>
        )
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Container>
                    <Row>
                        <Col>
                            <Label>
                                <FormattedMessage id={'event.eventTitle'} defaultMessage='Event title'/>
                            </Label>
                            <Field
                                name={'eventTitle'}
                                component={this.renderInput}
                                validate={[required]}
                            />
                        </Col>
                    </Row>

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
// debugger;
    if(values.time) {
        if(values.time.startDay &&
           values.time.endDay &&
           values.time.startDay > values.time.endDay
        ) {
            debugger;
            errors.time={};
            errors.time.startDay = 'error.time.startDateBeforeEnd';
        }
    }

    if(!values.place || !values.place.label) {
        // debugger;
        errors.place={};
        errors.place.label='error.field.required'
    }



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