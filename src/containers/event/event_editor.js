import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/ui/spinner';
import { post, get } from '../../actions'
import { postWithResult } from '../../utils/helpers';
import HtmlContentPostprocess from '../../utils/html_content_postprocess';
import { EVENT_LOADED, PLACE_LOADED } from '../../actions/types';
import EventEditForm from './event_edit_form';

class EventEditor extends Component{

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

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

    async onSubmit(values) {
        debugger;
        const processor = new HtmlContentPostprocess();
        const apiObject = {
            title: values.title,
            startDate: values.time.startDate,
            startTime: values.time.startTime,
            endDate: values.time.endDate,
            endTime: values.time.endTime
        };
        apiObject.placeId = values.place.id || await EventEditor.postPlace(values.place);
        apiObject.content = await processor.postProcess(values.content);
        apiObject.thumbnail = await processor.uploadImg(values.thumbnail);

        this.postEvent(apiObject);
    }

    onCancel() {
        this.props.history.goBack();
    }

    render() {
        const { match: {params: { eventId, placeId }}, event, place } = this.props;

        if((eventId && !event) || (placeId && !place)) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        }

        return (
            <div>
                <EventEditForm
                    initialValues={{ ...event, place }}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </div>
        )
    }
}

function mapStateToProps({ events, places }, ownProps) {
    const { eventId, placeId } = ownProps.match.params;
    return {
        event: events[eventId],
        place: places[placeId]
    }
}

export default connect(mapStateToProps, { get, post })(EventEditor);