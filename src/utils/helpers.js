import axios from 'axios';
import {ROOT_URL, SERVER_URL_PLACEHOLDER} from './constant';
import _ from "lodash";

export const hasRole = (user, roles) => {
    return user && roles.includes(user.role);
};

export const isOwner = (user, event) => {
    return user && event && user.id === event.ownerId;
};

export const replaceServerUrlPlaceholder = event => {
	const regex = new RegExp(SERVER_URL_PLACEHOLDER, 'g');
	event.thumbnail = event.thumbnail.replace(regex, ROOT_URL);
	event.content = event.content.replace(regex, ROOT_URL);
};

export const stripDiacritics = sting => sting.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

export const radiusToDegreeDistance = (radius) => radius / 78.71 * 0.001;

export const dateRangeOverlap = (eventStart, eventEnd, filterStart, filterEnd) => {
	debugger;
	if(!filterStart) {
		return (eventStart <= filterEnd)
	}

	if(!filterEnd) {
		return (eventEnd >= filterStart)
	}

	// todo: handle on filter ui
	if(filterStart > filterEnd) {
		return true;
	}

	return (eventStart <= filterEnd) && (eventEnd >= filterStart)
};

export const isPointWithinCircle = (center, radius, point) => {
	const centerXY = {x: center.lon, y: center.lat };
	const pointXY  = {x: point.lon, y: point.lat };
	const radiusDeg= radiusToDegreeDistance(radius);

	const calc = Math.sqrt((pointXY.x-centerXY.x)*(pointXY.x-centerXY.x) + (pointXY.y-centerXY.y)*(pointXY.y-centerXY.y));
	return calc < radiusDeg;
};

export const areCoordinatesValid = (coords) => {
    return coords
        && coords.lat
        && coords.lon
        && typeof (coords.lat) === 'number'
        && typeof (coords.lon) === 'number';
};

export const timeToMilliseconds = (hours, minutes) => (minutes * 60000 + hours * 3600000);

export const millisecondsToTime = (millis) => {
    const hours = Math.floor(millis / 3600000);
    const minutes = (millis % 3600000) / 60000;
    return hours + ':' + minutes;
};

export const postWithResult = async (request) => {
    const {endpoint, payload, params, successCallback} = request;
    let result;
    await axios.post(`${ROOT_URL}/${endpoint}`, payload, {params})
        .then( response => {
            successCallback && successCallback();
            result = response.data;
        })
        .catch(err => {
            debugger;
        });
    return result;
};