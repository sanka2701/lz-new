import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from './external/google_map';
import { areCoordinatesValid } from '../utils/helpers';
import { LM_GPS_COORDS } from '../utils/constant';

const MapPicker = ({onMarkerSet, coordinates, title}) => {
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
                       center={LM_GPS_COORDS}
                       zoom={10}
                       callback={onMarkerSet}
                       gestureHandling={'cooperative'}
                       // coordinates={getCoordinates()}
                       onLoaded={(googleMaps, map, callback) => {
                           googleMaps.event.addListener(map, 'click', function(event) {
                               const placeInfo = {};

                               if (event.placeId) {
                                   placeInfo.placeid = event.placeId;
                                   event.stop();
                               }

                               placeInfo.marker = new googleMaps.Marker({
                                   position: event.latLng,
                                   map: map
                               });

                               googleMaps.event.addListener(placeInfo.marker, 'click', function(event) {
                                   placeInfo.marker.setMap(null);
                                   callback(null);
                               });

                               placeInfo.marker.setAnimation(googleMaps.Animation.DROP);
                               callback(placeInfo);
                           });
                       }}
            />
        </div>
    )
};

MapPicker.propTypes = {
    onMarkerSet: PropTypes.func.isRequired,
    title: PropTypes.string,
    coordinates : PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    })
};

export default MapPicker;