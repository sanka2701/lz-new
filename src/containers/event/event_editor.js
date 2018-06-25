import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { reduxForm, formValueSelector } from 'redux-form';
import { Container, Row, Col, Button } from 'reactstrap';

import { post, get } from '../../actions'
import { required } from '../../utils/valdiators';
import { postWithResult } from '../../utils/helpers';
import EventDateEditor from '../../components/event_date_editor';
import HtmlContentPostprocess from '../../utils/html_content_postprocess';
import PlaceHandler from '../place/place_handler';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form_content_editor';
import { EVENT_LOADED, PLACE_LOADED } from '../../actions/types';

class EventEditor extends Component{
    componentDidMount() {
        const { eventId, placeId } = this.props.match.params;
        (eventId && !this.props.event) && this.loadEvent(eventId);
        (placeId && !this.props.place) && this.loadPlace(placeId);
    }

    // todo: duplicate code with event detail
    loadEvent(id) {
        const request = {
            endpoint: 'events',
            params: { id },
            successAction: EVENT_LOADED,
            failureAction: 'nok'
        };

        this.props.get(request);
    }

    // todo: duplicate code with event detail
    loadPlace(id){
        const request = {
            endpoint: 'places/id',
            params: { id },
            successAction: PLACE_LOADED,
            failureAction: 'nok'
        };
        this.props.get(request);
    }

    async onSubmit(values) {
        debugger;
        const processor = new HtmlContentPostprocess();
        const apiObject = {
            heading: values.eventTitle,
            startDate: values.time.startDay,
            startTime: values.time.startTime,
            endDate: values.time.endDay,
            endTime: values.time.endTime
        };
        apiObject.placeId = values.place.id || await EventEditor.postPlace(values.place);
        apiObject.content = await processor.postProcess(values.content);
        apiObject.thumbnail = await processor.uploadImg(values.thumbnail);

        this.postEvent(apiObject);
    }

    postEvent(event) {
        const request = {
            endpoint: 'events',
            payload: event,
            params: {},
            successAction: 'ok',
            failureAction: 'nok'
        };
        this.props.post(request);
    }

    static async postPlace(place) {
        const request = {
            endpoint: 'places',
            payload: place,
            params: {},
            successAction: 'ok',
            failureAction: 'nok'
        };
        const storeResponse = await postWithResult(request);
        return storeResponse.place.id;
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Container>
                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            <Button type='submit' color='success' >
                                <FormattedMessage id={'event.submitButton'} defaultMessage='Submit event'/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type='button' color='warning' onClick={() => this.props.reset()}>
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
                            <FormInput
                                messageId={'event.eventTitle'}
                                defaultMessage={'Event title'}
                                name={'eventTitle'}
                                validate={[required]}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm='4'>
                            <FormFileUpload
                                name={'thumbnail'}
                                validate={[required]}
                            />
                        </Col>
                        <Col sm='8' className={"align-self-center"}>
                            <EventDateEditor />
                        </Col>
                    </Row>

                    <PlaceHandler change={this.props.change} />

                    <Row>
                        <Col>
                            <FormContentEditor
                                name={'content'}
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

function mapStateToProps(state, ownProps) {
    const { eventId, placeId } = ownProps.match.params;
    const event = state.events[eventId];
    const place = state.places[placeId];
// debugger;
    return {
        event: event,
        place: place,
        // initialValues: {
        //     // time: {
        //     //     startDay : event.startDate ? new Date(event.startDate) : '',
        //     //     endDay   : event.endDate   ? new Date(event.endDate)   : '',
        //     //     startTime: event.startTime,
        //     //     endTime  : event.endTime
        //     // },
        //     place: place,
        //     // place: {
        //     //     label: 'Liptovsky Hradok',
        //     //     address: 'Belanska 574/8',
        //     //     lat: '49.09725059408648',
        //     //     lon: '19.625701904296875'
        //     // },
        //     eventTitle: event.heading,
        //     content: event.content
        // },
        eventContent: selector(state, 'content')
    }
}

export default compose(
    connect(mapStateToProps, { post, get }),
    reduxForm({form: 'create_event', validate})
)(EventEditor);