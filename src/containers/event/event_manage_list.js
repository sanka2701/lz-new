import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { compose } from 'redux';
import { loadEventsByFilter, setEventPagination } from '../../actions';
import EventRow from '../../components/event/event_row';
import _ from 'lodash';
import Pagination from '../../components/ui/pagination';

class EventManageList extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentDidMount(){
        this.props.loadEventsByFilter({});
    }

    renderRows() {
        const { byId, pages, currentPage } = this.props.events;
        const eventsArr = _.map(pages[currentPage - 1], (id) => byId[id]);

        const content = _.map(eventsArr, event => {
            return (
                <Col sm={12} key={'event-mng-' + event.id}>
                    <EventRow event={event}/>
                </Col>
            )
        });

        return (
            <Row className={'row-eq-height'}>
                {content}
            </Row>
        );
    }

    onPaginationChange(pageIndex) {
        this.props.setEventPagination(pageIndex);
    }

    render() {
        console.log(this.props.events);
        const { pageCount, currentPage } = this.props.events;
        return (
            <div>
                { this.renderRows() }
                <Pagination activePage={currentPage} pageCount={pageCount} onPageSelect={this.onPaginationChange} />
            </div>
        )
    }
}

const mapStateToProps = ({events}) => {
    return { events }
};

export default compose(
    connect(mapStateToProps, { loadEventsByFilter, setEventPagination })
)(EventManageList);