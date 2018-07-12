import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { compose } from 'redux';
import { loadEventsByFilter, setEventPagination } from '../../actions';
import withSideBar from '../../components/ui/content/with_sidebar';
import PostCard from '../../components/post/post_card';
import EventRow from '../../components/event/event_row';
import PropTypes from "prop-types";
import _ from 'lodash';
import Pagination from '../../components/ui/pagination';
import styles from './event_list.module.css';

class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentDidMount(){
        this.props.loadEventsByFilter({approved : true});
    }

    renderRows() {
        const { byId, pages, currentPage } = this.props.events;
        const eventsArr = _.map(pages[currentPage - 1], (id) => byId[id]);

        const content = _.map(eventsArr, event => (
                    <Col md={6} key={'event-' + event.id}>
                        <Link to={`/events/${event.id}/${event.placeId}`}
                              style={{textDecoration: 'none', color: 'inherit', height: '100%'}}>
                            <PostCard post={event}/>
                        </Link>
                    </Col>
            ));

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
    connect(mapStateToProps, { loadEventsByFilter, setEventPagination }),
    withSideBar
)(EventList);