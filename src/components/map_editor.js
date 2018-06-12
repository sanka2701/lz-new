import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Row, Col } from 'reactstrap';
import MapPicker from './map_picker'

// todo: resolve double markers for editing existing places
class MapEditor extends Component{
    constructor(props){
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.state = {
            marker: null,
            selectedPlace: props.selectedPlace,
            placeSetFromPicker: false
        }
    }

    shouldComponentUpdate({selectedPlace}) {
        let tmp = this.state.selectedPlace.lat !== selectedPlace.lat &&
        this.state.selectedPlace.lon !== selectedPlace.lon
        debugger;

        return tmp

    }

    componentWillReceiveProps({selectedPlace}) {
        debugger;
        if (selectedPlace.lat !== null &&
            selectedPlace.lon !== null &&
            selectedPlace !== this.state.selectedPlace) {
            this.setState({ selectedPlace });
            this.setState({placeSetFromPicker: false});
        }
    }

    setMarker(placeInfo) {
        const oldMarker = this.state.marker;
        oldMarker && oldMarker.setMap(null);

        const place = {
            lat: placeInfo ? placeInfo.marker.getPosition().lat() : '',
            lon: placeInfo ? placeInfo.marker.getPosition().lng() : '',
            placeid: placeInfo ? placeInfo.placeid : null
        };
debugger;
        this.setState(prevState => ({
            placeSetFromPicker: true,
            marker: placeInfo ? placeInfo.marker : null,
            selectedPlace: {
                ...prevState.selectedPlace,
                lat: place.lon,
                lon: place.lat
            }
        }));
debugger;

        this.props.onPlaceSelect(place);
    }

    render() {
        return (
            <div>
                <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Col>
                        <MapPicker
                            onMarkerSet={(placeInfo) => {this.setMarker(placeInfo)}}
                            selectedPlace={this.state.selectedPlace}
                            renderPredefinedMarkers={this.state.placeSetFromPicker}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

MapEditor.propTypes = {
    selectedPlace : PropTypes.shape({
        label: PropTypes.string,
        lat: PropTypes.number,
        lon: PropTypes.number
    })
};

MapEditor.defaultProps = {
    selectedPlace: {
        label: '',
        lat: '',
        lon: ''
    }
};

export default MapEditor;
