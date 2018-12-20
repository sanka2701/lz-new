import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {loadEvents, setEventPagination, loadPlaces} from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import withSideBar from '../../components/ui/content/with_sidebar';
import Pagination from '../../components/ui/pagination';
import EventFilter from './event_filter';
import EventList from './event_list';
import _ from 'lodash';

import {makeGetEventsByApproval} from '../../filters/event_approval_filter';
import {Row} from "reactstrap";
import {
  filteredEventsSelector,
  pageCountSelector
} from "../../filters/tmp/approved_events_selector";

const EventListWithSpinner = withLoadingAnimation(EventList);

class EventTop extends React.Component {
	constructor(props) {
		super(props);
		this.onPaginationChange = this.onPaginationChange.bind(this);
	}

	componentDidMount() {
	  // in order to filter places, both places and events need to be pre loaded for children components
		this.props.loadEvents();
		this.props.loadPlaces();
	}

	onPaginationChange(pageIndex) {
		this.props.setEventPagination(pageIndex);
	}

	render() {
		// const {isLoading, events: {pageCount, currentPage, byId, pages}} = this.props;
		// const events = _.map(pages[currentPage - 1], (id) => byId[id]);
		const {isLoading, pageCount, currentPage} = this.props;

		//todo refactor rendering
		return (
			<React.Fragment>
				<Row>
					<EventFilter/>
				</Row>
				<div>
					<EventListWithSpinner isLoading={isLoading} />
					<Pagination activePage={currentPage}
                      pageCount={pageCount}
											onPageSelect={this.onPaginationChange}/>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	// const getEventsByApproval = makeGetEventsByApproval();
	return {
		// events: getEventsByApproval(events, {approved: true}),
		// events: filteredEventsSelector(state),
		// places: state.places.byId,
		isLoading: state.events.isLoading || state.places.isLoading,
    pageCount: pageCountSelector(state),
    currentPage: state.events.currentPage,
	}
};

export default compose(
	connect(mapStateToProps, { loadEvents, setEventPagination, loadPlaces}),
	withSideBar
)(EventTop);