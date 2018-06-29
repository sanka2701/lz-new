import { post, get } from './index';
import {EVENT_LOADED} from "./types";

export const loadEventById = id => dispatch => {
    const request = {
        endpoint: 'events',
        params: { id },
        successAction: EVENT_LOADED,
        failureAction: 'nok'
    };

    dispatch(get(request));
};

export const postEvent = event => dispatch => {
    const request = {
        endpoint: 'events',
        payload: event,
        params: {},
        successAction: 'ok',
        failureAction: 'nok'
    };
    dispatch(post(request));
};