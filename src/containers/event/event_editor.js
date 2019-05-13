import React from 'react';
import {connect} from 'react-redux';
import {
	loadPlaceById,
	loadEventById,
	postEvent,
	updateEvent,
	updatePlace,
	postPlace,
	loadTagsIfNeeded
} from '../../actions';
import EventEditForm from '../../components/event/event_edit_form';
import PropTypes from "prop-types";
import {values, last} from 'lodash';
import store from '../../services/store';
import {produce} from "immer";

class EventEditor extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onApprove = this.onApprove.bind(this);
	}

	componentDidMount() {
		// todo: use loadPlacesIfNeeded and loadEventsIfNeeded
		const {eventId, placeId} = this.props.match.params;
		(eventId && !this.props.event) && this.props.loadEventById(eventId);
		(placeId && !this.props.place) && this.props.loadPlaceById(placeId);
		this.props.loadTagsIfNeeded();
	}

	async onSubmit(event) {
		debugger;
		if(!event.place.id){
			await this.props.postPlace(event.place);
		}

		const apiEvent = produce(event, draft => {
			draft.placeId = event.place.id || last(store.getState().places.ids);
			draft.endTime = event.endTime.millis;
			draft.startTime = event.startTime.millis;
			draft.tags = event.tags.map(tag => tag.id);
			delete draft.place;
		});

		const successCallback = () => {
			this.props.history.push('/events/')
		};

		event.id
			? this.props.updateEvent(apiEvent, successCallback)
			: this.props.postEvent(apiEvent, successCallback)
	}

	onApprove() {
		const {event} = this.props;
		event.approved = true;
		debugger;
		this.props.updateEvent(event);
	}

	onCancel() {
		this.props.history.goBack();
	}

	render() {
		const {match: {params: {eventId, placeId}}, event, place, tags} = this.props;
		const editMode = !!eventId && !!placeId;

		//todo: add with loader animatin wrapper
		return (
			<React.Fragment>
				<EventEditForm
					editMode={editMode}
					tags={tags}
					initialValues={editMode ? {...event, place} : null}
					onSubmit={this.onSubmit}
					onCancel={this.onCancel}
					onApprove={this.onApprove}
				/>
			</React.Fragment>
		)
	}
}

EventEditor.propTypes = {
	event: PropTypes.object,
	place: PropTypes.object,
	tags:  PropTypes.arrayOf(PropTypes.object)
};

EventEditor.defaultProps = {
	event: null,
	place: null,
	tags: []
};

function mapStateToProps({events, places, tags}, ownProps) {
	const {eventId, placeId} = ownProps.match.params;
	return {
		event: events.byId[eventId],
		place: places.byId[placeId],
		tags: values(tags.byId)
	}
}

export default connect(mapStateToProps, {
	loadTagsIfNeeded,
	loadEventById,
	updateEvent,
	postEvent,
	loadPlaceById,
	updatePlace,
	postPlace
})(EventEditor);