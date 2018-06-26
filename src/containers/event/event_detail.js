import React from 'react';
import { EVENT_LOADED, PLACE_LOADED } from '../../actions/types';
import { connect } from 'react-redux';
import { get } from '../../actions';
import { Row, Col} from 'reactstrap';
import DOMPurify from 'dompurify';
import Spinner from '../../components/ui/spinner';

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
        const { event, place } = this.props;

        if(!event || !place) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        }


        return (
            <div>
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
                          <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(event.content)}}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

// EventDetail.defaultProps = {
//     event: null,
//     place: null
// };

const mapStateToProps = ({ events, places }, ownProps) => {
    const { eventId, placeId } = ownProps.match.params;
    return {
        event: events[eventId],
        place: places[placeId]
    }
};

export default connect(mapStateToProps, { get })(EventDetail);