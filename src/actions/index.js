import axios from 'axios';

import { LOCALE_CHANGED } from './types';
import { AUTH_USER } from './types';
import { AUTH_USER_OUT } from './types';
import { AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:8080';

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

export const get = (request) => async dispatch => {
    const {endpoint, successAction, failureAction} = request;
    await axios.get(`${ROOT_URL}/${endpoint}`, {
        params: {
            subname: 'bar'
        }
    })
        .then( response => {
            debugger;
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

export const post = (request) => async dispatch => {
    const {endpoint, payload, successAction, failureAction} = request;
    await axios.post(`${ROOT_URL}/${endpoint}`, payload)
        .then( response => {
            debugger;
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

export const loginUserByToken = (jwtToken) => async dispatch => {
    await axios.get(`${ROOT_URL}/user`, /*{ headers: {"Authorization" : `Bearer ${jwtToken}`} }*/)
        .then(response => {
            dispatch({
                type: AUTH_USER,
                payload: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            });
        });
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
