import { get, post } from './index';
import {
  GET_PLACES_FAILURE,
  GET_PLACES_SUCCESS,
  POST_PLACE_FAILURE,
  POST_PLACE_SUCCESS,
  GET_PLACES_REQUEST,
  SET_PLACE_FILTER,
  RESET_PLACE_FILTER, SET_USERS_FILTER
} from "./types";
import {change} from "redux-form";

export const loadPlaceById = id => dispatch => {
    const request = {
        endpoint: 'places/id',
        params: { id },
        successAction: GET_PLACES_SUCCESS,
        failureAction: GET_PLACES_FAILURE
    };
    dispatch(get(request));
};

export const loadPlaces = () => dispatch => {
  dispatch(requestPlaces());
  const request = {
    endpoint: 'places/list',
    successAction: GET_PLACES_SUCCESS,
    failureAction: GET_PLACES_FAILURE
  };
  dispatch(get(request));
};

export const postPlace = place => async dispatch => {
    const request = {
        endpoint: 'places',
        payload: place,
        successAction: POST_PLACE_SUCCESS,
        failureAction: POST_PLACE_FAILURE
    };
    await dispatch(post(request));
};

export const setPlaceFilter = filter => dispatch => {
  dispatch({
    type: SET_PLACE_FILTER,
    payload: { filter }
  })
};

export const resetPlaceFilter = dispatch => {
  dispatch({
    type: RESET_PLACE_FILTER
  })
};

export const selectPlace = (place, formName) => dispatch => {
  dispatch(change(formName, 'place', place))
};

export const requestPlaces = () => {
  return {
    type: GET_PLACES_REQUEST
  }
};