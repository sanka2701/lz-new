import { PLACE_LOADED, PLACES_LOADED } from '../actions/types';
import _ from 'lodash';

//todo: refactor naming of actions  PLACE_SELECTED -> PLACE_SUGGESTION_SELECTED so its clearer
export default function (state = {}, action) {
    switch (action.type) {
        case PLACES_LOADED:
            return _.mapKeys(action.payload.places, 'id');
        case PLACE_LOADED:
            return { ...state, [action.payload.place.id] : action.payload.place };
        default:
            return state
    }
}