import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Input, Label } from 'reactstrap';
import PlacePicker from './map_picker'

class PlaceEditor extends Component{
    constructor(props){
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.state = {
            marker: null,
            selectedPlace: props.selectedPlace
        }
    }

    componentWillReceiveProps({selectedPlace}) {
        if (selectedPlace !== this.state.selectedPlace) {
            this.setState({ selectedPlace });
        }
    }

    setMarker({placeid, marker}) {
        const oldMarker = this.state.marker;
        oldMarker && oldMarker.setMap(null);
        placeid && this.props.cb(placeid);

        this.setState(prevState => ({
            selectedPlace: {
                ...prevState.selectedPlace,
                longitude: marker.getPosition().lng(),
                latitude: marker.getPosition().lat()
            }
        }));
        this.setState({marker});
    }

    onPlaceChange(newValue, attribute) {
        this.setState(prevState => ({
            selectedPlace: {
                ...prevState.selectedPlace
            }[attribute] = newValue
        }))
    }

    render() {
        const {selectedPlace} = this.state;

        return (
            <div>
                <Row style={{marginTop: '20px', marginBottom: '10px'}}>
                    <Col sm="3">
                        <Label>
                            <FormattedMessage id={'places.name'} defaultMessage='Name the place'/>
                        </Label>
                    </Col>
                    <Col sm='9'>
                        <Input value={this.state.selectedPlace.name}
                               onChange={event => this.onPlaceChange(event.target.value, 'name')}/>
                    </Col>
                </Row>

                <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Col sm="3">
                        <Label>
                            <FormattedMessage id={'places.address'} defaultMessage='Address'/>
                        </Label>
                    </Col>
                    <Col sm='9'>
                        <Input value={this.state.selectedPlace.address}
                               onChange={event => this.onPlaceChange(event.target.value, 'address')}/>
                    </Col>
                </Row>

                <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Col sm="3">
                        <Label>
                            <FormattedMessage id={'places.lat'} defaultMessage='Latitude'/>
                        </Label>
                    </Col>
                    <Col sm='3'>
                        {/*<Input type='text' value={this.state.marker ? this.state.marker.getPosition().lat() : ''} disabled/>*/}
                        <Input value={selectedPlace.latitude || ''}
                               onChange={event => this.onPlaceChange(event.target.value, 'latitude')} disabled/>
                    </Col>
                    <Col sm="3">
                        <Label>
                            <FormattedMessage id={'places.lat'} defaultMessage='Longtitude'/>
                        </Label>
                    </Col>
                    <Col sm='3'>
                        {/*<Input type='text' value={this.state.marker ? this.state.marker.getPosition().lng() : ''} disabled/>*/}
                        <Input value={selectedPlace.longitude || ''}
                               onChange={event => this.onPlaceChange(event.target.value, 'longitude')} disabled/>
                    </Col>
                </Row>

                <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Col>
                        <PlacePicker onMarkerSet={(placeInfo) => {this.setMarker(placeInfo)}}
                                     title={selectedPlace.name}
                                     coordinates={{lat: selectedPlace.latitude, lng: selectedPlace.longitude}}
                        />
                    </Col>
                </Row>

            </div>
        )
    }
}

PlaceEditor.defaultProps = {
    selectedPlace: {
        name: '',
        address: '',
        latitude: '',
        longitude: ''
    }
};

export default PlaceEditor;
