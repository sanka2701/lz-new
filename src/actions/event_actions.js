import { post, get } from './index';
import {GET_EVENTS_REQUEST,CHANGE_EVENT_PAGE,GET_EVENTS_FAILURE, GET_EVENTS_SUCCESS, POST_EVENT_SUCCESS, POST_PLACE_FAILURE} from "./types";
import {postPlace} from "./place_actions";
import HtmlContentPostprocess from '../utils/html_content_postprocess';
import _ from 'lodash';
// todo: transfer all the storing images and replacing image urls work to backend -> simplify frontend
export const postEvent = ({ place, thumbnail, ...event })=> async (dispatch, getState) => {
    try {
        const processor = new HtmlContentPostprocess();
        const files = await processor.getContentFiles(event.content);

        const formData = new FormData();
        formData.append('event', JSON.stringify(event));
        formData.append('place', JSON.stringify(place));
        formData.append('thumbnail', thumbnail);
        formData.append('fileUrls', _.keys(files));
        _.values(files).forEach(file => {
            formData.append('file', file);
        });
debugger;
        // if(!place.id) {
        //     await dispatch(postPlace(place));
        //     place = getState().places.last();
        // }
        //
        // event.thumbnail = thumbnail instanceof File ? await processor.uploadImg(thumbnail): thumbnail;
        // event.content = await processor.postProcess(content);
        // event.placeId = place.id;

        const request = {
            endpoint: 'events',
            payload: formData,
            params: {},
            successAction: POST_EVENT_SUCCESS,
            failureAction: POST_PLACE_FAILURE
        };
        await dispatch(post(request));
    } catch (error) {
        debugger;
        //todo: dispatch action to set error
        console.error('ERROR PROCESSING EVENT', error);
    }
};

// todo: change to update event
export const approveEvent = id => dispatch => {
    const request = {
        endpoint: 'events/approve',
        params: { id },
        successAction: 'ok',
        failureAction: 'nok'
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