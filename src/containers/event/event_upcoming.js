import React from 'react';
import PostMiniCard from '../../components/post/post_mini_card';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeGetUpcomingEvents } from '../../filters/event_upcoming_filter';
import _ from 'lodash';

const getEventCards = (events) =>  _.map(events, (event) => {
    return (
        <Col sd={12} key={'event-' + event.id}>
            <Link to={`/events/${event.id}/${event.placeId}`}
                  style={{textDecoration: 'none', color: 'inherit', height: '100%'}}>
                <PostMiniCard post={event}/>
            </Link>
        </Col>
    )
});

const UpcomingEvents = ({ events }) => (
    <Row>
        {getEventCards(events)}
    </Row>
);

const mapStateToProps = ({ events }) => {
    const getUpcomingEvents= makeGetUpcomingEvents();
    return {
        events: getUpcomingEvents(events)
    }
};

export default compose(
    connect(mapStateToProps)
)(UpcomingEvents)