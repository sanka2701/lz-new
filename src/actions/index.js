import axios from 'axios';
import { change } from 'redux-form'
import { ERROR_DISMISSED, ERROR_SAVING_PLACE } from './types';
import { AUTH_USER_OUT} from './types';
import { PLACES_CLEARED } from './types';

import { ROOT_URL, GOOGLE_URL, GOOGLE_API_KEY } from '../utils/constant';

export * from './article_actions';
export * from './place_actions';
export * from './event_actions';
export * from './locale_actions';
export * from './potw_actions';

export const dismissModalError = () => {
    return {
        type: ERROR_DISMISSED,
        payload: null
    }
};

//todo: remove, just testing purposes
export const testAction = () => {
    return {
        type: ERROR_SAVING_PLACE,
        payload: null
    }
};

export const clearSuggestions = () => {
    return {
        type: PLACES_CLEARED,
        payload: null
    }
};

export const logoutUser = () => {
    return {
        type: AUTH_USER_OUT,
        payload: null
    }
};

export const selectGooglePOI = (placeid) => async dispatch => {
    await axios.get(`${GOOGLE_URL}`, {
        params: {
            placeid,
            key: GOOGLE_API_KEY
        }
    }).then( response => {
        const { result } = response.data;
        const domainPlace = {
            address: result.formatted_address,
            label:   result.name,
            lat:     result.geometry.location.lat,
            lon:     result.geometry.location.lng
        };

        dispatch(change('create_event', 'place', domainPlace))
    })
    .catch(err => {
        //todo: do some error handling
        debugger;
    })
};

export const get = (request) => async dispatch => {
    const {endpoint, successAction, failureAction, params} = request;
    await axios.get(`${ROOT_URL}/${endpoint}`, {params})
        .then( response => {
            dispatch({
                type: successAction,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: failureAction,
                payload: err.response.data
            })
        })
};

export const post = (request) => async dispatch => {
    const {endpoint, payload, successAction, failureAction, params, successCallback} = request;
    await axios.post(`${ROOT_URL}/${endpoint}`, payload, {params})
        .then( response => {
            successCallback && successCallback();
            dispatch({
                type: successAction,
                payload: response.data
            })
        })
        .catch(err => {
            debugger;
            dispatch({
                type: failureAction,
                payload: err.response.data
            })
        })
};
