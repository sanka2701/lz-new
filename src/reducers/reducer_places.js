import {
  GET_PLACES_SUCCESS,
  GET_PLACES_FAILURE,
  GET_PLACES_REQUEST,
  POST_PLACE_SUCCESS} from "../actions/types";
import { mapKeys, map } from 'lodash';

const defaultState = {
  byId: {},
  ids: [],
  isLoading: false
};

export default function (state = defaultState, action) {
    const { places } = action.payload ? action.payload : {places: []};
    switch (action.type) {
      case POST_PLACE_SUCCESS:
        //todo: test if newly added place is added to the list
        debugger;
        var newState = {
          ...state,
          byId: Object.assign(state.byId, mapKeys(places, 'id')),
          ids: state.ids.concat(map(places, 'id')),
          isLoading: false
        };
        return newState;
      case GET_PLACES_SUCCESS:
        return {
          ...state,
          byId: mapKeys(places, 'id'),
          ids: map(places, 'id'),
          isLoading: false
        };
      case GET_PLACES_FAILURE:
        return {...state, isLoading: false};
      case GET_PLACES_REQUEST:
        return {...state, isLoading: true};
      default:
        return state;
    }
}