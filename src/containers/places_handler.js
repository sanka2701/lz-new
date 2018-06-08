import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col, Button, Collapse, Input, Label, FormGroup } from 'reactstrap';

import GoogleMap from '../components/external/google_map';
import { connect } from 'react-redux';
import { post, get } from '../actions/index';
class PlacesHandler extends Component{

    constructor(){
        super();
        this.setMarker = this.setMarker.bind(this);
        this.state = {
            marker: null,
            collapse: true
        }
    }

    toggleMap() {
        this.setState({ collapse: !this.state.collapse });
    }

    setMarker(newMarker) {
        const {marker} = this.state;
        marker && marker.setMap(null);

        this.setState({
            marker: newMarker
        });
    }

    submit(){
        const request = {
            endpoint: 'places',
            successAction: 'ok',
            failureAction: 'nok'
        };
        this.props.get(request);

        // const request = {
        //     endpoint: 'places',
        //     payload: {},
        //     successAction: 'ok',
        //     failureAction: 'nok'
        // };
        // this.props.post(request);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="2">
                        <Label>
                            <FormattedMessage id={'places.name'} defaultMessage='Name the place'/>
                        </Label>
                    </Col>
                    <Col sm='6'>
                        <Input id='name' type='text'/>
                    </Col>
                    <Col>
                        <Button color="primary" onClick={this.toggleMap.bind(this)}>
                            <FormattedMessage id={'places.showMap'} defaultMessage='Show Map'/>
                        </Button>
                    </Col>
                </Row>

                <Row style={{marginTop: '20px', marginBottom: '20px'}}>
                    <Col sm="2">
                        <Label>
                            <FormattedMessage id={'places.lat'} defaultMessage='Latitude'/>
                        </Label>
                    </Col>
                    <Col sm='4'>
                        <Input id='name' type='text' value={this.state.marker ? this.state.marker.getPosition().lat() : ''} disabled/>
                    </Col>
                    <Col sm="2">
                        <Label>
                            <FormattedMessage id={'places.lat'} defaultMessage='Longtitude'/>
                        </Label>
                    </Col>
                    <Col sm='4'>
                        <Input id='name' type='text' value={this.state.marker ? this.state.marker.getPosition().lng() : ''} disabled/>
                    </Col>
                </Row>

                <Row >
                    <Col>
                        <Collapse isOpen={this.state.collapse}>
                            <div style={{height: '300px'}}>
                                <GoogleMap googleMaps={window.google.maps}
                                           center={{lat: 43.604363, lng: 1.443363}}
                                           zoom={8}
                                           cb={this.setMarker}
                                           gestureHandling={'cooperative'}
                                           onLoaded={(googleMaps, map, cb) => {
                                               googleMaps.event.addListener(map, 'click', function(event) {
                                                   const marker = new googleMaps.Marker({
                                                       position: event.latLng,
                                                       map: map
                                                   });

                                                   googleMaps.event.addListener(marker, 'click', function(event) {
                                                       marker.setMap(null);
                                                       cb(null);
                                                   });

                                                   // marker.setAnimation(googleMaps.Animation.BOUNCE);
                                                   marker.setAnimation(googleMaps.Animation.DROP);
                                                   cb(marker);
                                               });
                                           }}
                                />
                            </div>
                        </Collapse>
                    </Col>
                </Row>

                <button onClick={this.submit.bind(this)}>submit</button>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentLocale: state.locale.locale,
        currentUser: state.auth.user
    }
}

export default connect(mapStateToProps, { post, get })(PlacesHandler);
