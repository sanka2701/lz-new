import { post, get } from './index';
import {
  GET_TAGS_REQUEST,
  GET_TAGS_FAILURE,
  GET_TAGS_SUCCESS,
  POST_TAG_FAILURE,
  POST_TAG_SUCCESS
} from "./types";

export const postTag = ( eventTag ) => async (dispatch) => {
  const request = {
    endpoint: 'eventtag',
    payload: eventTag,
    params: {},
    successAction: POST_TAG_SUCCESS,
    failureAction: POST_TAG_FAILURE
  };
  dispatch(post(request));
};

export const loadTags = () => dispatch => {
  dispatch(requestTags());
  const request = {
    endpoint: 'eventtag',
    successAction: GET_TAGS_SUCCESS,
    failureAction: GET_TAGS_FAILURE
  };
  dispatch(get(request));
};

export const requestTags = () => {
  return {
    type: GET_TAGS_REQUEST
  }
};