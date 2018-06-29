import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { loadEventsByFilter } from '../../actions';
import PostCard from '../../components/post/post_card';
import EventRow from '../../components/event/event_row';
import PropTypes from "prop-types";
import _ from 'lodash';

class EventList extends React.Component {

    componentDidMount(){
        console.log('manager view: ', this.props.managerView);
        this.props.loadEventsByFilter({approved : !this.props.managerView});
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
                        <PostCard post={event}/>
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

export default connect(mapStateToProps, { loadEventsByFilter })(EventList);