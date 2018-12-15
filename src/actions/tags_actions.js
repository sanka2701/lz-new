import { post, get, remove } from './index';
import {
	GET_TAGS_REQUEST,
	GET_TAGS_FAILURE,
	GET_TAGS_SUCCESS,
	POST_TAG_FAILURE,
	POST_TAG_SUCCESS,
	SET_TAG_FILTER,
	RESET_TAG_FILTER,
	DELETE_TAG_SUCCESS,
	DELETE_TAG_FIALURE,
} from "./types";

export const deleteTag = ( id ) => async dispatch => {
	const request = {
		endpoint: 'eventtag',
		successAction: DELETE_TAG_SUCCESS,
		failureAction: DELETE_TAG_FIALURE,
		id
	};
	dispatch(remove(request));
};

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

export const setTagFilter = filter => dispatch => {
	dispatch({
		type: SET_TAG_FILTER,
		payload: { filter }
	})
};

export const resetTagFilter = () => dispatch => dispatch({ type: RESET_TAG_FILTER });

export const requestTags = () => {
  return {
    type: GET_TAGS_REQUEST
  }
};