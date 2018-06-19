import axios from 'axios';
import { ROOT_URL } from './constant';

export const areCoordinatesValid = ({lat, lon}) => {
    return lat
        && lon
        && typeof (lat) === 'number'
        && typeof (lon) === 'number';
};

export const timeToMilliseconds = (hours, minutes) => (minutes * 60000 + hours * 3600000);

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