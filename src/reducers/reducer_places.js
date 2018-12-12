import {
  GET_PLACES_SUCCESS,
  GET_PLACES_FAILURE,
  GET_PLACES_REQUEST,
  POST_PLACE_SUCCESS,
  SET_PLACE_FILTER,
  RESET_PLACE_FILTER } from "../actions/types";
import { mapKeys, map } from 'lodash';
import { LM_GPS_COORDS } from "../utils/constant";

const defaultFilter = {
	isSet: false,
  center: {
    lat: null,
    lon: null,
  },
  radius: 2000,
};

const defaultState = {
  byId: {},
  ids: [],
  isLoading: false,
  filter: defaultFilter
};

export default function (state = defaultState, action) {
    const { places } = action.payload ? action.payload : {places: []};
    switch (action.type) {
      case POST_PLACE_SUCCESS:
        //todo: test if newly added place is added to the list
        debugger;
        const newState = {
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
      case SET_PLACE_FILTER:
        const { filter } = action.payload;
        return {...state,
          filter: {
            ...state.filter,
            ...filter,
						isSet: true,
          }
        };
      case RESET_PLACE_FILTER:
        return {...state, filter: defaultFilter };
      default:
        return state;
    }
}