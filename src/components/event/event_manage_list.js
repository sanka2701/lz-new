import React from 'react';
import PropTypes from "prop-types";
import EventRow from './event_row';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';

const getRows = (events) => _.map(events, event => {
    return (
        <Col sm={12} key={'event-mng-' + event.id}>
            <EventRow event={event}/>
        </Col>
    )
});

const EventManageList = ({ events }) => (
    <Row>
        { getRows(events) }
    </Row>
);

EventManageList.propTypes = {
    events: PropTypes.array.isRequired
};

export default EventManageList;