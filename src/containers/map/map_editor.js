import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { fetchGooglePlace, placeSelected } from '../../actions/index';
import { Row, Col } from 'reactstrap';
import MapPicker from '../../components/map/map_picker'

class MapEditor extends Component{
    constructor(props){
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.state = {
            marker: null,
            selectedPlace: props.selectedPlace
        }
    }

    shouldComponentUpdate({selectedPlace}) {
        return this.state.selectedPlace.lat !== selectedPlace.lat &&
            this.state.selectedPlace.lon !== selectedPlace.lon;
    }

    componentWillReceiveProps({selectedPlace}) {
        if (selectedPlace !== this.state.selectedPlace) {
            this.setState({ selectedPlace });
        }
    }

    setMarker(placeInfo) {
        const oldMarker = this.state.marker;
        oldMarker && oldMarker.setMap(null);

        const place = {
            lat: placeInfo.lat || '',
            lon: placeInfo.lon || '',
            placeid: placeInfo.placeid || ''
        };

        this.setState(prevState => ({
            marker: placeInfo.marker || null,
            selectedPlace: {
                ...prevState.selectedPlace,
                lat: place.lon,
                lon: place.lat
            }
        }));

         place.placeid ?
            this.props.fetchGooglePlace(place.placeid) :
            this.props.placeSelected({lat: place.lat, lon: place.lon, address: '', label: ''});
    }

    render() {
        return (
            <div>
                <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Col>
                        <MapPicker
                            onMarkerSet={this.setMarker}
                            selectedPlace={this.state.selectedPlace}
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

export default connect(null, { fetchGooglePlace, placeSelected })(MapEditor);
