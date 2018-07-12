import React from 'react';
import { connect } from 'react-redux';
import { loadEventById, loadPlaceById, postEvent, approveEvent } from '../../actions';
import Spinner from '../../components/ui/spinner';
import EventEditForm from './event_edit_form';
import PropTypes from "prop-types";

class EventEditor extends React.Component{
    constructor(props) {
        super(props);
        this.onSubmit  = this.onSubmit.bind(this);
        this.onCancel  = this.onCancel.bind(this);
        this.onApprove = this.onApprove.bind(this);
    }

    componentDidMount() {
        const { eventId, placeId } = this.props.match.params;
        (eventId && !this.props.event) && this.props.loadEventById(eventId);
        (placeId && !this.props.place) && this.props.loadPlaceById(placeId);
    }

    async onSubmit(values) {
        const apiObject = {
            title: values.title,
            startDate: values.startDate,
            startTime: values.startTime.millis,
            endDate  : values.endDate,
            endTime  : values.endTime.millis,
            //todo: remove - try to store times as milliseconds directly and pass values object to action
            thumbnail: values.thumbnail,
            content : values.content,
            place : values.place
        };
        this.props.postEvent(apiObject);
    }

    onApprove() {
        this.props.approveArticle(this.props.event.id);
    }

    onCancel() {
        this.props.history.goBack();
    }

    render() {
        const { match: {params: { eventId, placeId }}, event, place } = this.props;
        const editMode  = !!eventId && !!placeId;

        if(editMode && (!event || !place)) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        }

        return (
            <div>
                <EventEditForm
                    editMode={editMode}
                    initialValues={editMode ? { ...event, place } : null}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                    onApprove={this.onApprove}
                />
            </div>
        )
    }
}

EventEditor.propTypes = {
    event: PropTypes.object,
    place: PropTypes.object
};

EventEditor.defaultProps = {
    event: null,
    place: null
};

function mapStateToProps({ events, places }, ownProps) {
    const { eventId, placeId } = ownProps.match.params;
    return {
        event: events.byId[eventId],
        place: places.toJS()[placeId]
    }
}

export default connect(mapStateToProps, { loadPlaceById, loadEventById, approveArticle: approveEvent, postEvent })(EventEditor);