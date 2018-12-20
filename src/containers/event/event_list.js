import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import PostCard from '../../components/post/post_card';
import PropTypes from "prop-types";
import _ from 'lodash';

import styles from './event_list.module.css';
import {filteredEventsSelector} from '../../filters/tmp/approved_events_selector';
import {connect} from 'react-redux';

const getRows = (events) => _.map(events, event => (
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


const mapStateToProps = (state) => {
  return {
    events: filteredEventsSelector(state)
  }
};

export default connect(mapStateToProps)(EventList);