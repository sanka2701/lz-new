import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from './external/google_map';
import { areCoordinatesValid } from '../utils/helpers';
import { LM_GPS_COORDS } from '../utils/constant';

const MapPicker = ({onMarkerSet, selectedPlace, renderPredefinedMarkers}) => {
    const getCoordinates = () => {
        debugger;
        return !renderPredefinedMarkers && areCoordinatesValid(selectedPlace) ? [
            {
                title: selectedPlace.label || "default",
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
                       center={LM_GPS_COORDS}
                       zoom={12}
                       callback={onMarkerSet}
                       gestureHandling={'cooperative'}
                       coordinates={getCoordinates()}
                       onLoaded={(googleMaps, map, callback) => {
                           googleMaps.event.addListener(map, 'click', function(event) {
                               const placeInfo = {};
                               map.panTo(event.latLng);

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
    renderPredefinedMarkers: PropTypes.boolean,
    onMarkerSet: PropTypes.func.isRequired,
    selectedPlace : PropTypes.shape({
        label: PropTypes.string,
        lat: PropTypes.number,
        lon: PropTypes.number
    })
};

MapPicker.defaultProps = {
    renderPredefinedMarkers: false,
    selectedPlace: {
        label: '',
        lat: '',
        lon: ''
    }
};

export default MapPicker;