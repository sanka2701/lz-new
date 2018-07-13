import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import PostCard from '../../components/post/post_card';
import PropTypes from "prop-types";
import _ from 'lodash';

import styles from './event_list.module.css';

class EventList extends React.Component {
    getRows() {
        return _.map(this.props.events, event => (
            <Col md={6} key={'event-' + event.id}>
                <Link to={`/events/${event.id}/${event.placeId}`}
                      style={{textDecoration: 'none', color: 'inherit', height: '100%'}}>
                    <PostCard post={event}/>
                </Link>
            </Col>
        ));
    }

    render() {
        return (
            <Row className={'row-eq-height'}>
                { this.getRows() }
            </Row>
        )
    }
}

EventList.propTypes = {
    events: PropTypes.array.isRequired
};

export default EventList;