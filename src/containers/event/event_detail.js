import React from 'react';
import { EVENT_LOADED, PLACE_LOADED } from '../../actions/types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from '../../actions';
import { Row, Col, Button } from 'reactstrap';
import PostContent from '../../components/post/post_content';
import Spinner from '../../components/ui/spinner';
import { isOwner, hasRole } from '../../utils/helpers';
import { ROLE_ADMIN } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import EventInfo from '../../components/event/event_info_bar';

class EventDetail extends React.Component {
    componentDidMount() {
        const { eventId, placeId } = this.props.match.params;
        !this.props.event && this.loadEvent(eventId);
        !this.props.place && this.loadPlace(placeId);
    }

    loadEvent(id) {
        const request = {
            endpoint: 'events',
            params: { id },
            successAction: EVENT_LOADED,
            failureAction: 'nok'
        };

        this.props.get(request);
    }

    loadPlace(id){
        const request = {
            endpoint: 'places/id',
            params: { id },
            successAction: PLACE_LOADED,
            failureAction: 'nok'
        };
        this.props.get(request);
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
                {(isOwner(currentUser, event) || hasRole(currentUser, [ROLE_ADMIN])) && (
                    <Row>
                        <Col sm={8} />
                        <Col sm={2} >
                            <Button
                                color='warning'
                                tag={Link}
                                to={`/events/edit/${event.id}/${place.id}`}
                            >
                                <FormattedMessage id='event.editButton' defaultMessage='Edit' />
                            </Button>
                        </Col>
                        <Col sm={2} >
                            <Button color='info' >
                                <FormattedMessage id={'event.approveButton'} defaultMessage='Approve' />
                            </Button>
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col>
                        <img src={event.thumbnail} style={{ maxWidth: '100%', maxHeight: '100vh', height: 'auto' }}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <EventInfo event={event} place={place} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3>
                            {event.title}
                        </h3>
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

export default connect(mapStateToProps, { get })(EventDetail);