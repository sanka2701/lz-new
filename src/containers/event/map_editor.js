import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
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

    //todo: refactor
    setMarker(placeInfo) {
        const oldMarker = this.state.marker;
        oldMarker && oldMarker.setMap(null);

        const place = {
            lat: placeInfo ? placeInfo.lat : '',
            lon: placeInfo ? placeInfo.lon : '',
            placeid: placeInfo ? placeInfo.placeid : null
        };

        this.setState(prevState => ({
            marker: placeInfo ? placeInfo.marker : null,
            selectedPlace: {
                ...prevState.selectedPlace,
                lat: place.lon,
                lon: place.lat
            }
        }));

        if( place.placeid ) {
            this.props.fetchGooglePlace(place.placeid);
        } else {
            this.props.placeSelected({lat: place.lat, lon: place.lon, address: '', label: ''});
        }
    }

    render() {
        return (
            <div>
                <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Col>
                        <MapPicker
                            onMarkerSet={(placeInfo) => {this.setMarker(placeInfo)}}
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
