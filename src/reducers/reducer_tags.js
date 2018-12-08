import _ from 'lodash';
import {
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS_REQUEST } from "../actions/types";

const defaultState = {
  byId: {},
  ids: [],
  isLoading: false
};

export default function (state = defaultState, action) {
  switch(action.type) {
    case GET_TAGS_SUCCESS:
      const { tags } = action.payload;
      return {
        ...state,
        byId: _.mapKeys(tags, 'id'),
        ids: _.map(tags, 'id'),
        isLoading: false
      };
    case GET_TAGS_FAILURE:
      return {...state, isLoading: false};
    case GET_TAGS_REQUEST:
      return {...state, isLoading: true};
    default:
      return state;
  }
}