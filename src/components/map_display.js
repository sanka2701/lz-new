import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from './external/google_map';
import { areCoordinatesValid } from '../utils/helpers';
import { LM_GPS_COORDS } from '../utils/constant';

const MapDisplay = ({title, coordinates}) => {
    const getCoordinates = () => {
        return areCoordinatesValid(coordinates) ? [
            {
                title,
                position: coordinates,
                onLoaded: (googleMaps, map, marker) => {
                    marker.setAnimation(googleMaps.Animation.BOUNCE);
                    map.panTo(coordinates);
                }
            }
        ] : [];
    };

    return (
        <div style={{height: '300px'}}>
            <GoogleMap googleMaps={window.google.maps}
                       center={areCoordinatesValid(coordinates) ? coordinates : LM_GPS_COORDS}
                       zoom={12}
                       gestureHandling={'cooperative'}
                       coordinates={getCoordinates()}
            />
        </div>
    )
};

MapDisplay.propTypes = {
    title: PropTypes.string,
    coordinates : PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    })
};

MapDisplay.defaultProps = {
    title: '',
    coordinates: {}
};

export default MapDisplay;