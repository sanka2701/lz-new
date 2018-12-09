import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from '../external/google_map';
import { areCoordinatesValid } from '../../utils/helpers';
import { LM_GPS_COORDS } from '../../utils/constant';

const MapDisplay = ({onMarkerSet, selectedPlace, height, width, zoom, animation, disableDefaultUI}) => {
    const getCoordinates = () => {
        return areCoordinatesValid(selectedPlace) ? [
            {
              title: selectedPlace.title,
              position: {lng: selectedPlace.lon, lat: selectedPlace.lat},
              onLoaded: (googleMaps, map, circle) => {
                map.panTo({lng: selectedPlace.lon, lat: selectedPlace.lat});
              }
            }
        ] : [];
    };

    return (
      <div style={{height, width}}>
        <GoogleMap
          googleMaps={window.google.maps}
          center={areCoordinatesValid(selectedPlace) ? {lng: selectedPlace.lon, lat: selectedPlace.lat} : LM_GPS_COORDS}
          zoom={zoom}
          gestureHandling={'cooperative'}
          coordinates={getCoordinates()}
          disableDefaultUI={disableDefaultUI}
          onLoaded={(googleMaps, map) => {
            googleMaps.event.addListener(map, 'click', (event) => {
              const coordinates = {
                lat: event.latLng.lat(),
                lon: event.latLng.lng()
              };

              if (event.placeId) {
                event.stop();
              }
              onMarkerSet(coordinates, event.placeId);
            });
          }}
        />
      </div>
    )
};

MapDisplay.propTypes = {
  onMarkerSet: PropTypes.func.isRequired,
  selectedPlace : PropTypes.object,
  height: PropTypes.string,
  width: PropTypes.string,
  zoom: PropTypes.number,
  animation: PropTypes.string,
  disableDefaultUI: PropTypes.bool,
};

MapDisplay.defaultProps = {
  height: '300px',
  width: '100%',
  zoom: 12,
  animation: 'BOUNCE', // other options : 'NONE', DROP
  disableDefaultUI: false,
  selectedPlace: {
    label: '',
    lat: '',
    lon: ''
  }
};

export default MapDisplay;