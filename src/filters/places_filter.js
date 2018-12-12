import { createSelector } from 'reselect';

const getPlacesById   = (places) => places.byId;
const getPlacesFilter = (places) => places.filter;

const radiusToDegreeDistance = (radius) => radius / 78.71 * 0.001;

const isPointWithinCircle = (center, radius, point) => {
  const centerXY = {x: center.lon, y: center.lat };
  const pointXY  = {x: point.lon, y: point.lat };
  const radiusDeg= radiusToDegreeDistance(radius);

  const calc = Math.sqrt((pointXY.x-centerXY.x)*(pointXY.x-centerXY.x) + (pointXY.y-centerXY.y)*(pointXY.y-centerXY.y));
  return calc < radiusDeg;
};

export const makeGetPlacesByFilter = () => createSelector(
  [ getPlacesById, getPlacesFilter, ],
  ( byId, filter ) => {
    return Object.values(byId).filter(( place ) => {
      const {lat, lon} = place;
      return filter.isSet && filter.center && filter.radius
        ? isPointWithinCircle(filter.center, filter.radius, {lat, lon})
        : true;
    });
  }
);