import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadEvents, setEventPagination } from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import Pagination from '../../components/ui/pagination';
import EventManageList from '../../components/event/event_manage_list';
import _ from 'lodash';

import {makeGetEventsByApproval} from '../../filters/event_approval_filter';

const EventListWithSpinner = withLoadingAnimation(EventManageList);

class EventManageTop extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentDidMount() {
        this.props.loadEvents();
    }

    onPaginationChange(pageIndex) {
        this.props.setEventPagination(pageIndex);
    }

    render() {
        const { isLoading, events: { pageCount, currentPage, byId, pages } } = this.props;
        const events = _.map(pages[currentPage - 1], (id) => byId[id]);

        return (
            <div>
                <EventListWithSpinner isLoading={isLoading} events={events} />
                <Pagination activePage={currentPage} pageCount={pageCount} onPageSelect={this.onPaginationChange} />
            </div>
        )
    }
}

const mapStateToProps = ({ events }) => {
    const getEventsByApproval = makeGetEventsByApproval();
    return {
        events: getEventsByApproval(events, {approved: false}),
        isLoading: events.isLoading
    }
};

export default compose(
    connect(mapStateToProps, { loadEvents, setEventPagination })
)(EventManageTop);