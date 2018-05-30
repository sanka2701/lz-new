import axios from 'axios';

import { LOCALE_CHANGED } from './types';
import { AUTH_USER } from './types';
import { AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:8080';

export function changeLocale(locale) {
    return {
        type: LOCALE_CHANGED,
        payload: locale
    }
}

export const loginUser = (credentials) => async dispatch => {
    try {
        const response = await axios.post(`${ROOT_URL}/users/login`, credentials);
        dispatch({type: AUTH_USER, payload: response.data.token});
    } catch (e) {
        dispatch({type: AUTH_ERROR, payload: e});
    }
};

export function registerUser(credentials) {
    const request = axios.post(`${ROOT_URL}/`, credentials);

    return {
        type: AUTH_USER,
        payload: request
    }
}