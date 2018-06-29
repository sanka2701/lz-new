import { post, get } from './index';
import {GET_EVENTS_FAILURE, GET_EVENTS_SUCCESS, POST_EVENT_SUCCESS, POST_PLACE_FAILURE} from "./types";
import {postPlace} from "./place_actions";
import HtmlContentPostprocess from '../utils/html_content_postprocess';

export const postEvent = ({thumbnail, content, place, ...event})=> async (dispatch, getState) => {
    try {
        if(!place.id) {
            await dispatch(postPlace(place));
            place = getState().places.last();
        }
        const processor = new HtmlContentPostprocess();
        event.thumbnail = thumbnail instanceof File ? await processor.uploadImg(thumbnail): thumbnail;
        event.content = await processor.postProcess(content);
        event.placeId = place.id;

        const request = {
            endpoint: 'events',
            payload: event,
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

export const approveEvent = id => dispatch => {
    const request = {
        endpoint: 'events/approve',
        params: { id },
        successAction: 'ok',
        failureAction: 'nok'
    };
    dispatch(post(request));
};

export const loadEventById = id => dispatch => {
    const request = {
        endpoint: 'events',
        params: { id },
        successAction: GET_EVENTS_SUCCESS,
        failureAction: GET_EVENTS_FAILURE
    };

    dispatch(get(request));
};

export const loadEventsByFilter = filter => dispatch => {
    const request = {
        endpoint: 'events/filter',
        params: {},
        payload: {...filter},
        successAction: GET_EVENTS_SUCCESS,
        failureAction: 'nok'
    };
    dispatch(post(request));
};