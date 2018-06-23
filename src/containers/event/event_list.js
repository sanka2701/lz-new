import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { get } from '../../actions';
import { EVENTS_LOADED } from '../../actions/types';
import EventCard from '../../components/event/event_card';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class EventList extends React.Component {

    componentDidMount(){
        const request = {
            endpoint: 'events/filter',
            params: {},
            successAction: EVENTS_LOADED,
            failureAction: 'nok'
        };

        this.props.get(request);
    }


    renderEvents(row) {
        return _.map(row, event => {
            return (
                <Col sm='6' key={event.id}>
                    <Link to={'/events/' + event.id} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <EventCard event={event}/>
                    </Link>
                </Col>
            )
        })
    }


    renderRows() {
        const eventsArr = _.values(this.props.events);
        const eventRows = _.chunk(eventsArr, 2);
        let index = 0;

        return _.map(eventRows, row => {
            return (
                <Row key={'eventRow' + index++}>
                    { this.renderEvents(row) }
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

const mapStateToProps = ({events}) => {
    return { events }
};

export default connect(mapStateToProps, { get })(EventList);