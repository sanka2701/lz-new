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

    async onSubmit(values) {
        debugger;

        // process images
        const processor = new HtmlContentPostprocess();
        const modifiedContent = await processor.postProcess(values.content);
            // .then(replaced => {
            //     console.log(replaced)
            // });

        // get thumbnailUrl
        debugger;
        // const thumbailFile = await processor.blobUrlToFile(values.thumbnail);
        const thumbailFile = values.thumbnail;
        debugger;
        const thumbnailUrl = await processor.uploadImg(thumbailFile);
        debugger;

        // resolve place
        if(!values.place.id) {

        }
        // map values to fit backend api

        // post
    }

    mapAttrsToApi(formValues) {
        const apiObject = {

        }
    }

    test() {

    }

    renderCKEditor = ({input: {onChange, onBlur, value}, meta}) => {
        // todo: rewrite to es6 style without return statement
        return (
            <div>
                <CKEditor
                    events={{
                        change : (event) => {
                            onChange(event.editor.getData());
                        },
                        blur : (event) => {
                            onBlur();
                        },
                    }}
                    value={value}
                />
                <ErrorSlider
                    errorCode={meta.error}
                    displayed={meta.touched && meta.error}
                />
            </div>
        )
    };

    renderInput = ({ input, meta }) => {
        // debugger;
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

    renderFileUpload = ({ input, meta }) => {
        return (
            <div>
                <FileUploader {...input} />
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

                    <button type="button" onClick={this.test.bind(this)}>test</button>

                    <Row>
                        <Col>
                            <Button type='submit' color='success' >
                                <FormattedMessage id={'event.submitButton'} defaultMessage='Submit event'/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type='button' color='warning' >
                                <FormattedMessage id={'event.resetButton'} defaultMessage='Reset form'/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type='button' color='danger' >
                                <FormattedMessage id={'event.cancelButton'} defaultMessage='Cancel'/>
                            </Button>
                        </Col>
                    </Row>

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

                    <Row>
                        <Col sm='4'>
                            <Field
                                name={'thumbnail'}
                                component={this.renderFileUpload}
                                validate={[required]}
                            />
                        </Col>
                        <Col sm='8' className={"align-self-center"}>
                            <EventDateEditor />
                        </Col>
                    </Row>

                    <PlaceHandler change={this.props.change}/>

                    <Row>
                        <Col>
                            <Field
                                name={'content'}
                                component={this.renderCKEditor}
                                validate={[required]}
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
        initialValues: {
            time: {
                startDay: Date.now(),
                endDay: Date.now(),
                startTime: 80,
                endTime: 90
            },
            place: {
                label: 'Liptovsky Hradok',
                address: 'Belanska 574/8',
                lat: '49.09725059408648',
                lon: '19.625701904296875'
            },
            eventTitle: 'Testing event',
            content: '<p> Testovaci paragraf</p>'
        },
        eventContent: selector(state, 'content')
    }
}

export default compose(
    connect(mapStateToProps, {}),
    reduxForm({form: 'create_event', validate})
)(EventEditor);