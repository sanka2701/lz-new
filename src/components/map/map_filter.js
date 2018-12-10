import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from '../external/google_map_c';
import { areCoordinatesValid } from '../../utils/helpers';
import { LM_GPS_COORDS } from '../../utils/constant';

//todo: due to lot of shared code with map_display.js merge to single file
const MapFilter = ({onCircleSet, selectedCircle, ...mapProps}) => {
  const getCircle = (circleProp) => {
    return areCoordinatesValid(circleProp.center) ? [{
      center: {lng: circleProp.center.lon, lat: circleProp.center.lat},
      radius: circleProp.radius,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      onLoaded: (googleMaps, map, circle) => {
        // map.panTo({lng: circleProp.lon, lat: circleProp.lat});
        googleMaps.event.addListener(circle, 'click', function(event) {
          // circle.setMap(null);
          onCircleSet({
            center: null
          });
        });
      }
    }] : [] ;
  };

  return (
    <div style={{height: '300px'}}>
      <GoogleMap googleMaps={window.google.maps}
                 center={LM_GPS_COORDS}
                 zoom={12}
                 gestureHandling={'cooperative'}
                 circles={getCircle(selectedCircle)}
                 onLoaded={(googleMaps, map, callback) => {
                   googleMaps.event.addListener(map, 'click', (event) => {
                     map.panTo(event.latLng);
                     const center = {
                       lat: event.latLng.lat(),
                       lon: event.latLng.lng()
                     };

                     onCircleSet({center});
                   });
                 }}
                 {...mapProps}
      />
    </div>
  )
};

MapFilter.propTypes = {
  onCircleSet: PropTypes.func.isRequired,
  selectedCircle : PropTypes.object,
  height: PropTypes.string,
  width: PropTypes.string,
  zoom: PropTypes.number,
  animation: PropTypes.string,
  disableDefaultUI: PropTypes.bool,
};

MapFilter.defaultProps = {
  height: '300px',
  width: '100%',
  zoom: 12,
  animation: 'BOUNCE', // other options : 'NONE', DROP
  disableDefaultUI: false,
  selectedCircle: {
    radius: 0,
    center: {
      lat: '',
      lon: ''
    }
  }
};

export default MapFilter;