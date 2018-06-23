import React from 'react';
import { EVENT_LOADED, PLACE_RECEIVED } from '../../actions/types';
import { connect } from 'react-redux';
import { get } from '../../actions';
import { FormattedMessage } from 'react-intl';
import { Row, Col} from 'reactstrap';
import DOMPurify from 'dompurify';
import MapDisplay from '../../components/map/map_display';
import Spinner from '../../components/ui/spinner';

class EventDetail extends React.Component {

    componentWillReceiveProps({ event }) {
        if (event) {
            const { placeId } = event;
            const request = {
                endpoint: 'places/id/',
                params: { id : placeId },
                successAction: PLACE_RECEIVED,
                failureAction: 'nok'
            };
            this.props.get(request);
        }
    }

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
        }
    }

    render(){
        const { event, place } = this.props;

        if(!event || !place) {
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
                        <img src={event.thumbnail} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <MapDisplay selectedPlace={place} />
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
//     event: {}
// };

const mapStateToProps = ({ events, places }, ownProps) => {
    const { id } = ownProps.match.params;
    // debugger;
    return {
        event: events[id],
        place: places.selectedPlace
    }
};

export default connect(mapStateToProps, { get })(EventDetail);