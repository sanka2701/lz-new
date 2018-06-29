import { get, post } from './index';
import { PLACE_LOADED } from "./types";
import {change} from "redux-form";

export const loadPlaceById = id => dispatch => {
    const request = {
        endpoint: 'places/id',
        params: { id },
        successAction: PLACE_LOADED,
        failureAction: 'nok'
    };
    dispatch(get(request));
};

export const selectPlace = place => dispatch => {
    dispatch(change('create_event', 'place', place))
};