import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import PostCard from '../post/post_card';
import PropTypes from "prop-types";
import _ from 'lodash';

import styles from '../../containers/event/event_list.module.css';

const getRows = (events) => _.map(events, event => (
    <BorderCol md={6} key={'event-' + event.id} style={{marting: '10px'}}>
        <Link to={`/events/${event.id}/${event.placeId}`}
              style={{textDecoration: 'none', color: 'inherit', height: '100%'}}>
            <PostCard post={event}/>
        </Link>
    </BorderCol>
));

const EventList = ({events}) => (
    <Row className={'row-eq-height'} >
        { getRows(events) }
    </Row>
);

EventList.propTypes = {
    events: PropTypes.array.isRequired
};

export default EventList;