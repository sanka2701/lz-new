import {GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, SET_USERS_FILTER} from "./types";
import {post} from "./index";

export const requestUsers = () => {
    return {
        type: GET_USERS_REQUEST
    }
};

export const loadUsersByFilter = (filter) => dispatch => {
    dispatch(requestUsers());
    const request = {
        endpoint: 'users/filter',
        payload: filter,
        successAction: GET_USERS_SUCCESS,
        failureAction: GET_USERS_FAILURE
    };
    dispatch(post(request));
};

export const setUserFilter = (filter) => {
    return {
        type: SET_USERS_FILTER,
        payload: { filter }
    }
};