import React from 'react';
import { EVENT_LOADED, PLACE_LOADED } from '../../actions/types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadEventById, loadPlaceById } from '../../actions';
import { Row, Col, Button } from 'reactstrap';
import PostImage from '../../components/post/post_image';
import PostContextMenu from '../../components/post/post_context_menu';
import PostContent from '../../components/post/post_content';
import Spinner from '../../components/ui/spinner';
import { isOwner, hasRole } from '../../utils/helpers';
import { ROLE_ADMIN } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import EventInfo from '../../components/event/event_info_bar';

import styles from './event_detail.module.css';

class EventDetail extends React.Component {
    componentDidMount() {
        const { eventId, placeId } = this.props.match.params;
        !this.props.event && this.props.loadEventById(eventId);
        !this.props.place && this.props.loadPlaceById(placeId);
    }

    render(){
        const { event, place, currentUser } = this.props;

        if(!event || !place) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        }

        return (
            <div>
                {/*{(isOwner(currentUser, event) || hasRole(currentUser, [ROLE_ADMIN])) && (*/}
                    {/*<Row>*/}
                        {/*<Col sm={8} />*/}
                        {/*<Col sm={2} >*/}
                            {/*<Button*/}
                                {/*color='warning'*/}
                                {/*tag={Link}*/}
                                {/*to={`/events/edit/${event.id}/${place.id}`}*/}
                            {/*>*/}
                                {/*<FormattedMessage id='event.editButton' defaultMessage='Edit' />*/}
                            {/*</Button>*/}
                        {/*</Col>*/}
                        {/*<Col sm={2} >*/}
                            {/*<Button color='info' >*/}
                                {/*<FormattedMessage id={'event.approveButton'} defaultMessage='Approve' />*/}
                            {/*</Button>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*)}*/}

                {/*<Row>*/}
                    {/*<PostContextMenu />*/}
                {/*</Row>*/}

                <Row>
                    <Col>
                        <PostImage imgSrc={event.thumbnail} title={event.title} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <EventInfo event={event} place={place} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PostContent content={event.content} />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = ({ events, places, auth }, ownProps) => {
    const { eventId, placeId } = ownProps.match.params;
    return {
        event: events[eventId],
        place: places[placeId],
        currentUser: auth.user
    }
};

export default connect(mapStateToProps, { loadEventById, loadPlaceById })(EventDetail);