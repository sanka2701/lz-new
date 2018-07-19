import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadEventsByFilter, setEventPagination } from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import withSideBar from '../../components/ui/content/with_sidebar';
import Pagination from '../../components/ui/pagination';
import EventFilter from './event_filter';
import EventList from '../../components/event/event_list';
import _ from 'lodash';

import {makeGetEventsByApproval} from '../../filters/event_view_filter';

const EventListWithSpinner = withLoadingAnimation(EventList);

class EventTop extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentDidMount() {
        this.props.loadEventsByFilter({});
    }

    onPaginationChange(pageIndex) {
        this.props.setEventPagination(pageIndex);
    }

    render() {
        const { isLoading, events: { pageCount, currentPage, byId, pages } } = this.props;
        const events = _.map(pages[currentPage - 1], (id) => byId[id]);

        return (
            <div>
                {/*<EventFilter />*/}
                <EventListWithSpinner isLoading={isLoading} events={events} />
                <Pagination activePage={currentPage} pageCount={pageCount} onPageSelect={this.onPaginationChange} />
            </div>
        )
    }
}

const mapStateToProps = ({ events }) => {
    const getEventsByApproval = makeGetEventsByApproval();
    return {
        events: getEventsByApproval(events, {approved: true}),
        isLoading: events.isLoading
    }
};

export default compose(
    connect(mapStateToProps, { loadEventsByFilter, setEventPagination }),
    withSideBar
)(EventTop);