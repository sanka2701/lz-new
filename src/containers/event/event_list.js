import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { post } from '../../actions';
import { EVENTS_LOADED } from '../../actions/types';
import EventCard from '../../components/event/event_card';
import EventRow from '../../components/event/event_row';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

class EventList extends React.Component {

    componentDidMount(){
        console.log('manager view: ', this.props.managerView);

        const request = {
            endpoint: 'events/filter',
            params: {},
            payload: {approved : !this.props.managerView},
            successAction: EVENTS_LOADED,
            failureAction: 'nok'
        };

        this.props.post(request);
    }

    renderEventRows(row) {
        return _.map(row, event => {
            return (
                <Col sm='12' key={event.id}>
                    <EventRow event={event}/>
                </Col>
            )
        })
    }

    renderEventCards(row) {
        return _.map(row, event => {
            return (
                <Col sm='6' key={event.id}>
                    <Link to={`/events/${event.id}/${event.placeId}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <EventCard event={event}/>
                    </Link>
                </Col>
            )
        })
    }


    renderRows() {
        const managerView = this.props.managerView;
        const eventsArr = _.values(this.props.events);
        const eventRows = _.chunk(eventsArr, managerView ? 1 : 2);
        let index = 0;

        return _.map(eventRows, row => {
            return (
                <Row key={'eventRow' + index++}>
                    { managerView ? this.renderEventRows(row) : this.renderEventCards(row) }
                </Row>
            )
        })
    }

    render() {
        console.log(this.props.events);
        return (
            <div>
                { this.renderRows() }
            </div>
        )
    }
}

EventList.props= {
    managerView: PropTypes.bool
};

EventList.defaultProps = {
    managerView: false
};

const mapStateToProps = ({events}) => {
    return { events }
};

export default connect(mapStateToProps, { post })(EventList);