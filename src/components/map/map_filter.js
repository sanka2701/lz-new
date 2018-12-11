import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from '../external/google_map_c';
import { areCoordinatesValid } from '../../utils/helpers';
import { LM_GPS_COORDS } from '../../utils/constant';

const MapFilter = ({onCircleSet, circles, onMarkerSet, markers, ...mapProps}) => {
  const getCircles = circleProps =>
    circleProps.filter(
      ({center}) => areCoordinatesValid(center)
    ).map( circleProp => {
      return {
        center: {lng: circleProp.center.lon, lat: circleProp.center.lat},
        radius: circleProp.radius,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        onLoaded: (googleMaps, map, circle) => {
          googleMaps.event.addListener(circle, 'click', function (event) {
            onCircleSet({
              center: null
            });
          });
        }
      }
  });

  const getMarkers = markerProps =>
    markerProps.filter(
      (marker => areCoordinatesValid(marker))
    ).map( markerProp => {
      return {
        title: markerProp.title,
        position: {lng: markerProp.lon, lat: markerProp.lat},
        onLoaded: (googleMaps, map, marker) => {
          googleMaps.event.addListener(marker, 'click', function (event) {
            console.log('Marker klicked:', marker)
            debugger;
          });
        }
      }
    });

  return (
    <div style={{height: '300px'}}>
      <GoogleMap googleMaps={window.google.maps}
                 center={LM_GPS_COORDS}
                 zoom={12}
                 gestureHandling={'cooperative'}
                 circles={getCircles(circles)}
                 markers={getMarkers(markers)}
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
  onMarkerSet: PropTypes.func,
  markers : PropTypes.object,
  onCircleSet: PropTypes.func,
  circles : PropTypes.object,
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
  markers: [],
  circles: []
  // selectedCircle: {
  //   radius: 0,
  //   center: {
  //     lat: '',
  //     lon: ''
  //   }
  // },
  // selectedPlace: {
  //   label: '',
  //   lat: '',
  //   lon: ''
  // }
};

export default MapFilter;