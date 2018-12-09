import React from 'react';
import PropTypes from "prop-types";

const inlineStyles = {
  position: "relative",
  overflow: "hidden",
  height: "100%",
  width: "100%",
};

class GoogleMap extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null,
      markers: new Map(),
      circleCache: new Map()
    }
  }

  componentDidMount() {
    const {coordinates, circle, googleMaps, onLoaded, callback, ...props} = this.props

    const map = new googleMaps.Map(this.ref_map, {
      ...props,
    });

    this.setState({map}, () => {
      this.addNewMarkers(coordinates);
      if(circle && circle.center) {
        this.addCircle(circle);
      }
    });

    if (onLoaded) {
      onLoaded(googleMaps, map, callback)
    }
  }

  manageCircle(circle) {
    //todo: not working
    const {circleCache} = this.state;
    const circleId = this.getCircleId(circle.center);

    if(circleCache.has(circleId)) {
      const oldCircle = circleCache.get(circleId);

      // circles are identical
      if(oldCircle.radius === circle.radius) {
        debugger;
        return
      }
    }

    if (!circleCache.size && !circleCache.has(circleId)) {
      // pridaj novy kruh
      circleCache.set(circleId, this.addCircle(circle));
    } else if (circleCache.has(circleId)) {
      // zmen priemer
      const oldCircle = circleCache.get(circleId);
      oldCircle.setRadius(circle.radius);
      circleCache.set(circleId, oldCircle);
    } else {
      // zmen priemer, polohu a Id
      const oldCircle = circleCache.values().next().value;
      oldCircle.setCenter(circle.center);
      oldCircle.setRadius(circle.radius);
      circleCache.clear();
      circleCache.set(circleId, oldCircle);
    }

    this.setState({circleCache}, () => {console.log(this.state.circleCache)});
  }

  addCircle(circle) {
    const {map} = this.state;
    const {googleMaps} = this.props;
    const {onLoaded, ...circleProps} = circle;

    const added = new googleMaps.Circle({
      map: map,
      ...circleProps,
    });

    if (onLoaded) {
      onLoaded(googleMaps, map, added)
    }

    return added;
  }

  removeCircle() {
    const {circleCache} = this.state;

    circleCache.forEach((circle, circleId) => {
      circle.setMap(null);
      circleCache.delete(circleId)
    });

    this.setState({circleCache});
  }

  componentWillReceiveProps(nextProps) {
    const newMarkers = nextProps.coordinates.some(
      coordinate => !this.state.markers.has(this.getMarkerId(coordinate))
    );
    const oldMarkers = [...this.state.markers.keys()].some(
      markerId =>
        !nextProps.coordinates.some(
          coordinate => markerId === this.getMarkerId(coordinate)
        )
    );

    if (oldMarkers) {
      this.removeOldMarkers(nextProps.coordinates)
    }

    if (newMarkers) {
      var a= 5;
      this.addNewMarkers(nextProps.coordinates)
    }

    // if(nextProps.circle) {
    //   debugger;
    //   this.manageCircle(nextProps.circle)
    // } else if (this.state.circleCache.size) {
    //   this.removeCircle();
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.coordinates) !== JSON.stringify(nextProps.coordinates)
  }

  getMarkerId(coordinate) {
    return coordinate.position.lat + "_" + coordinate.position.lng
  }

  getCircleId(center) {
    return center.lat + "_" + center.lng
  }

  removeOldMarkers(coordinates) {
    const {markers} = this.state;
    const {autoFitBounds} = this.props;

    markers.forEach((marker, markerId) => {
      const isMarkerUsed = coordinates.some(
        coordinate => this.getMarkerId(coordinate) === markerId
      );

      if (!isMarkerUsed) {
        marker.setMap(null);
        markers.delete(markerId)
      }
    });

    this.setState({markers});

    if (autoFitBounds) {
      this.fitBounds()
    }
  }

  addNewMarkers(coordinates) {
    const {markers} = this.state;
    const {autoFitBounds} = this.props;

    coordinates.forEach(coordinate => {
      const markerId = this.getMarkerId(coordinate);
      if (!markers.has(markerId)) {
        markers.set(markerId, this.addMarker(markerId, coordinate))
      }
    });

    this.setState({markers});

    if (autoFitBounds) {
      this.fitBounds()
    }
  }

  addMarker(markerId, coordinate) {
    const {map} = this.state;
    const {googleMaps} = this.props;
    const {callback} = this.props;
    const {onLoaded, ...markerProps} = coordinate;

    const marker = new googleMaps.Marker({
      map: map,
      ...markerProps,
    });

    if (onLoaded) {
      onLoaded(googleMaps, map, marker, callback)
    }

    return marker
  }

  fitBounds() {
    const {map, markers} = this.state;
    const {boundsOffset, googleMaps} = this.props;

    if (!map || markers.size === 0) {
      return
    }

    const bounds = Array.from(markers.values()).reduce(
      (bound, marker) => bound.extend(marker.getPosition()),
      new googleMaps.LatLngBounds()
    );
    const center = bounds.getCenter();

    bounds
      .extend(
        new googleMaps.LatLng(
          center.lat() + boundsOffset,
          center.lng() + boundsOffset
        )
      )
      .extend(
        new googleMaps.LatLng(
          center.lat() - boundsOffset,
          center.lng() - boundsOffset
        )
      );

    map.setCenter(center);
    map.fitBounds(bounds)
  }

  render() {
    return <div ref={ref => (this.ref_map = ref)} style={inlineStyles} />
  }
}

GoogleMap.propTypes = {
  autoFitBounds: PropTypes.bool,
  boundsOffset: PropTypes.number,
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      onLoaded: PropTypes.func,
    })
  ),
  googleMaps: PropTypes.object.isRequired,
  onLoaded: PropTypes.func,
};

GoogleMap.defaultProps = {
  autoFitBounds: false,
  boundsOffset: 0.002,
  coordinates: [],
  onLoaded: null,
};

export default GoogleMap