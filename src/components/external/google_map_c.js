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
      areaCache: new Map()
    }
  }

  componentDidMount() {
    const {circles, googleMaps, onLoaded, ...mapProps} = this.props

    const map = new googleMaps.Map(this.ref_map, {
      ...mapProps,
    });

    this.setState({map}, () => {
      this.update(circles);
    });

    if (onLoaded) {
      onLoaded(googleMaps, map)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.circles !== prevProps.circles) {
      this.update(this.props.circles);
    }
  }

  update(circles) {
    const diff = this.getDiffs(this.props.circles);
    this.updateMapItems(diff);
  }

  getDiffs(circles) {
    const { areaCache } = this.state;
    const diff = {
      newCircles: [],
      updatedCircles: [],
      removedCircleIds: []
    };
    const IDedCircles = circles.map(
      circle => this.desctructureParamCircle(circle)
    );

    diff.newCircles = IDedCircles.filter(
      circle => !areaCache.has(circle.id)
    );

    diff.updatedCircles = IDedCircles.filter(
      circle => areaCache.has(circle.id) && areaCache.get(circle.id).radius !== circle.radius
    );

    diff.removedCircleIds = !IDedCircles.length
      ? [...areaCache.keys()]
      : [...areaCache.keys()].filter(
        circleId => {
          return !IDedCircles.some(circle => circle.id === circleId);
        }
      );

    return diff;
  }

  updateMapItems(diff) {
    const { areaCache } = this.state;

    diff.newCircles.forEach(
      circle => areaCache.set(circle.id, this.addCircle(circle))
    );

    diff.updatedCircles.forEach(
      circle => this.updateCircle(areaCache, circle)
    );

    diff.removedCircleIds.forEach(
      circleId => this.removeCircle(areaCache, circleId)
    );

    this.setState({ areaCache });
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

  updateCircle(areaCache, circleUpdate) {
    const circle = areaCache.get(circleUpdate.id);
    circle.setRadius(circleUpdate.radius);
    circle.setCenter(circleUpdate.center);
  }

  removeCircle(areaCache, circleId) {
    const circle = areaCache.get(circleId);
    circle.setMap(null);
    areaCache.delete(circleId)
  }

  desctructureParamCircle(circle) {
    const { center, radius, ...circleProps } = circle;
    return {
      id: this.getCircleId(center),
      center,
      radius,
      ...circleProps
    }
  }

  getCircleId(center) {
    return center.lat + "_" + center.lng
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