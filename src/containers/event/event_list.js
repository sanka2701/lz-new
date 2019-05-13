import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import PostCard from '../../components/post/post_card';
import PropTypes from "prop-types";
import { map } from 'lodash';

import styles from './event_list.module.css';

const getRows = (events) => map(events, event => (
    <BorderCol md={6} grow={true} key={'event-' + event.id} >
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
  events: PropTypes.arrayOf(PropTypes.object)
};

export default (EventList);