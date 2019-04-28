import { post, get } from './index';
import {
	GET_EVENTS_REQUEST,
	CHANGE_EVENT_PAGE,
	GET_EVENTS_FAILURE,
	GET_EVENTS_SUCCESS,
	POST_EVENT_SUCCESS,
	POST_EVENT_FAILURE,
	SET_EVENT_FILTER,
	RESET_EVENT_FILTER,
	SET_NOTIFICATION
} from "./types";
import HtmlContentPostprocess from '../utils/html_content_postprocess';
import _ from 'lodash';

const toFormData = async ({ place, thumbnail, ...event }) => {
    const processor = new HtmlContentPostprocess();
    const files = await processor.getContentFiles(event.content);

    const formData = new FormData();
    formData.append('event', JSON.stringify(event));
    place && formData.append('place', JSON.stringify(place));
    _.forEach(files, ( file, url ) => {
        formData.append('fileUrls', url);
        formData.append('files', file);
    });
    thumbnail instanceof File
        ? formData.append('thumbnail', thumbnail)
        : event.thumbnail = thumbnail;

    return formData;
};

const buildRequest = async ( event, endpoint ) => {
    return {
        endpoint: endpoint,
        payload: await toFormData(event),
        successAction: POST_EVENT_SUCCESS,
        failureAction: POST_EVENT_FAILURE
    }
};

//todo: broken content files extraction
export const postEvent = ( event, successCallback ) => async (dispatch) => {
    const request = await buildRequest(event, 'events');
    request.successCallback = () => {
			dispatch({
				type: SET_NOTIFICATION,
				payload: {
					messageId: 'not.event.createSuccess',
					type: 'success'
				}
			});
			successCallback && successCallback();
		};

    dispatch(post(request));
};

//todo: fire UPDATE EVENT action to update just one event in store
export const updateEvent = (event) => async dispatch => {
    const request = await buildRequest(event, 'events/update');
    request.successCallback = () => {
        dispatch({
            type: SET_NOTIFICATION,
            payload: {
                messageId: 'not.event.approved',
                type: 'success'
            }
        });
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

export const loadEvents = () => dispatch => {
    dispatch(requestEvents());
    const request = {
        endpoint: 'events/all',
        params: {},
        successAction: GET_EVENTS_SUCCESS,
        failureAction: GET_EVENTS_FAILURE
    };
    dispatch(get(request));
};

export const setEventFilter = filter => dispatch => {
	dispatch({
		type: SET_EVENT_FILTER,
		payload: {filter}
	})
};

export const resetEventFilter = () => dispatch => {
	dispatch({
		type: RESET_EVENT_FILTER,
	})
};