import axios from 'axios';

import { LOCALE_CHANGED } from './types';
import { AUTH_USER } from './types';
import { AUTH_USER_OUT } from './types';
import { AUTH_ERROR, GOOGLE_PLACE_SELECTED, PLACE_SELECTED } from './types';

import { ROOT_URL, GOOGLE_URL, GOOGLE_API_KEY } from '../utils/constant';

export const changeLocale = (locale)  => {
    return {
        type: LOCALE_CHANGED,
        payload: locale
    }
};

export const logoutUser = () => {
    return {
        type: AUTH_USER_OUT,
        payload: null
    }
};

export const placeSelected = (place) => {
    return {
        type: PLACE_SELECTED,
        payload: place
    }
};

export const fetchGooglePlace = (placeid) => async dispatch => {
    await axios.get(`${GOOGLE_URL}`, {
        params: {
            placeid,
            key: GOOGLE_API_KEY
        }
    }).then( response => {
        dispatch({
            type: GOOGLE_PLACE_SELECTED,
            payload: response.data.result
        })
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
            successCallback();
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

export const loginUser = (credentials) => async dispatch => {
    await axios.post(`${ROOT_URL}/users/login`, credentials)
        .then(response => {
            dispatch({
                type: AUTH_USER,
                payload: response.data
            });
        })
        .catch(err => {
            debugger;
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            });
        });
    // try {
    //     const response = await axios.post(`${ROOT_URL}/users/login`, credentials);
    //     dispatch({type: AUTH_USER, payload: response.data.token});
    // } catch (e) {
    //     dispatch({type: AUTH_ERROR, payload: e});
    // }
};

export const registerUser = (credentials, redirectCallback) => async (dispatch) => {
    await axios.post(`${ROOT_URL}/users`, credentials)
        .then((response) => {
            dispatch({
                type: AUTH_USER,
                payload: response.data
            });
            redirectCallback();
        }).catch((err) => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            });
        });
};
