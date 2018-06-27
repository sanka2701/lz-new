import axios from 'axios';
import { ROOT_URL } from './constant';

export const hasRole = (user, roles) => {
    return user && roles.includes(user.role) !== -1
};

export const isOwner = (user, event) => {
    return user && event && user.id === event.ownerId;
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