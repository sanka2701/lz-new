import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {setEventPagination, loadEventsIfNeeded, loadPlacesIfNeeded} from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import withSideBar from '../../components/ui/content/with_sidebar';
import Pagination from '../../components/ui/pagination';
import EventFilter from './event_filter';
import EventList from './event_list';
import {Row} from "reactstrap";
import {
	currentPageEventsSelector,
	eventsPageCountSelector,
} from "../../filters/tmp/approved_events_selector";
import {makeLoadingSelector} from "../../filters/loading_selector";

const EventListWithSpinner = withLoadingAnimation(EventList);

class EventTop extends React.Component {
	constructor(props) {
		super(props);
		this.onPaginationChange = this.onPaginationChange.bind(this);
	}

	componentDidMount() {
	  // in order to filter places, both places and events need to be pre loaded for children components
		this.props.loadEventsIfNeeded();
		this.props.loadPlacesIfNeeded();
	}

	onPaginationChange(pageIndex) {
		this.props.setEventPagination(pageIndex);
	}

	render() {
		const {pageCount, currentPage, isLoading, events} = this.props;

		return (
			<React.Fragment>
				<Row>
					<EventFilter/>
				</Row>
				<div>
					<EventListWithSpinner isLoading={isLoading} events={events} />
					<Pagination activePage={currentPage}
                      pageCount={pageCount}
											onPageSelect={this.onPaginationChange}/>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	const loadingSelector = makeLoadingSelector(['events', 'places']);
	return {
		isLoading: loadingSelector(state),
		events: currentPageEventsSelector(state),
    pageCount: eventsPageCountSelector(state),
    currentPage: state.events.currentPage,
	}
};

export default compose(
	connect(mapStateToProps, { loadEventsIfNeeded, setEventPagination, loadPlacesIfNeeded}),
	withSideBar
)(EventTop);