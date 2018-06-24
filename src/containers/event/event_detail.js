import React from 'react';
import { EVENT_LOADED, PLACE_RECEIVED } from '../../actions/types';
import { connect } from 'react-redux';
import { get } from '../../actions';
import { FormattedMessage } from 'react-intl';
import { Row, Col} from 'reactstrap';
import DOMPurify from 'dompurify';
import MapDisplay from '../../components/map/map_display';
import Spinner from '../../components/ui/spinner';

import EventInfo from '../../components/event/event_info_bar';

class EventDetail extends React.Component {
    componentDidMount(){
        if(!this.props.event) {
            const {id} = this.props.match.params;
            const request = {
                endpoint: 'events',
                params: {id},
                successAction: EVENT_LOADED,
                failureAction: 'nok'
            };

            this.props.get(request);
        } else {
            this.loadPlace();
        }
    }

    loadPlace(){
        const { placeId } = this.props.event;
        const request = {
            endpoint: 'places/id/',
            params: { id : placeId },
            successAction: PLACE_RECEIVED,
            failureAction: 'nok'
        };
        this.props.get(request);
    }

    render(){
        const { event, place } = this.props;

        if(!event || !place) {
            // todo: not a good place ... think of a better way to load place after event
            !!event && this.loadPlace();
            return (
                <div>
                    Loading ... <br />
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
                            {event.heading}
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
    const { id } = ownProps.match.params;
    return {
        event: events[id],
        place: places.selectedPlace
    }
};

export default connect(mapStateToProps, { get })(EventDetail);