import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from '../external/google_map';
import { areCoordinatesValid } from '../../utils/helpers';
import { LM_GPS_COORDS } from '../../utils/constant';

const MapDisplay = ({selectedPlace}) => {
    const getCoordinates = () => {
        return areCoordinatesValid(selectedPlace) ? [
            {
                title: selectedPlace.title,
                position: {lng: selectedPlace.lon, lat: selectedPlace.lat},
                onLoaded: (googleMaps, map, marker) => {
                    marker.setAnimation(googleMaps.Animation.BOUNCE);
                    map.panTo({lng: selectedPlace.lon, lat: selectedPlace.lat});
                }
            }
        ] : [];
    };

    return (
        <div style={{height: '300px'}}>
            <GoogleMap googleMaps={window.google.maps}
                       center={areCoordinatesValid(selectedPlace) ? {lng: selectedPlace.lon, lat: selectedPlace.lat} : LM_GPS_COORDS}
                       zoom={12}
                       gestureHandling={'cooperative'}
                       coordinates={getCoordinates()}
            />
        </div>
    )
};

MapDisplay.propTypes = {
    selectedPlace : PropTypes.object
};

MapDisplay.defaultProps = {
    selectedPlace: {
        label: '',
        lat: '',
        lon: ''
    }
};

export default MapDisplay;