import React from 'react';
import { connect } from 'react-redux';
import { loadTags, loadPlaceById, loadEventById, postEvent, updateEvent } from '../../actions';
import Spinner from '../../components/ui/spinner';
import EventEditForm from '../../components/place/event_edit_form';
import PropTypes from "prop-types";
import { values } from 'lodash';

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
        (!this.props.tags || !this.props.tags.length) && this.props.loadTags();
    }

    async onSubmit(event) {
        const apiObject = {
            ...event,
            startTime: event.startTime.millis,
            endTime  : event.endTime.millis,
            tags: event.tags.map(tag => tag.id),
        };
        event.id
            ? this.props.updateEvent(apiObject)
            : this.props.postEvent(apiObject)
    }

    onApprove() {
        const { event } = this.props;
        event.approved = true;
        debugger;
        this.props.updateEvent(event);
    }

    onCancel() {
        this.props.history.goBack();
    }

    render() {
        const { match: {params: { eventId, placeId }}, event, place, tags } = this.props;
        const editMode  = !!eventId && !!placeId;

        // todo: fix spinner
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
                    tags={tags}
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

function mapStateToProps({ events, places, tags }, ownProps) {
    const { eventId, placeId } = ownProps.match.params;
    return {
        event: events.byId[eventId],
        place: places.byId[placeId],
        tags: values(tags.byId)
    }
}

export default connect(mapStateToProps, { loadTags, loadPlaceById, loadEventById, updateEvent, postEvent })(EventEditor);