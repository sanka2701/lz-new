import { post, get } from './index';
import {GET_EVENTS_REQUEST,CHANGE_EVENT_PAGE,GET_EVENTS_FAILURE, GET_EVENTS_SUCCESS, POST_EVENT_SUCCESS, POST_PLACE_FAILURE} from "./types";
import {postPlace} from "./place_actions";
import HtmlContentPostprocess from '../utils/html_content_postprocess';
import _ from 'lodash';

const toFormData = async ({ place, thumbnail, ...event }) => {
    const processor = new HtmlContentPostprocess();
    const files = await processor.getContentFiles(event.content);

    const formData = new FormData();
    formData.append('event', JSON.stringify(event));
    formData.append('place', JSON.stringify(place));
    formData.append('thumbnail', thumbnail);
    _.forEach(files, ( file, url ) => {
        formData.append('fileUrls', url);
        formData.append('file', file);
    });

    return formData;
};

export const postEvent = ( event ) => async (dispatch) => {
    let formData = await toFormData(event);

    const request = {
        endpoint: 'events',
        payload: formData,
        params: {},
        successAction: POST_EVENT_SUCCESS,
        failureAction: POST_PLACE_FAILURE
    };

    dispatch(post(request));
};

export const updateEvent = (event) => async dispatch => {
    let formData = await toFormData(event);

    const request = {
        endpoint: 'events/update',
        params: formData,
        successAction: POST_EVENT_SUCCESS,
        failureAction: POST_PLACE_FAILURE
    };

    dispatch(post(request));
};

export const setEventPagination = (pageIndex) => {
    return {
        type: CHANGE_EVENT_PAGE,
        payload: {pageIndex}
    }
};

export const requestEvents = () => {
    return {
        type: GET_EVENTS_REQUEST
    }
};

export const loadEventById = id => dispatch => {
    dispatch(requestEvents());
    const request = {
        endpoint: 'events',
        params: { id },
        successAction: GET_EVENTS_SUCCESS,
        failureAction: GET_EVENTS_FAILURE
    };

    dispatch(get(request));
};

export const loadEventsByFilter = filter => dispatch => {
    dispatch(requestEvents());
    const request = {
        endpoint: 'events/filter',
        params: {},
        payload: {...filter},
        successAction: GET_EVENTS_SUCCESS,
        failureAction: 'nok'
    };
    dispatch(post(request));
};