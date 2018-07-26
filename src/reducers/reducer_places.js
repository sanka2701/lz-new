import {GET_PLACES_SUCCESS, POST_PLACE_SUCCESS} from '../actions/types';
import Immutable from 'immutable';
import _ from 'lodash';

export default function (state = Immutable.OrderedMap({}), action) {
    switch (action.type) {
        case POST_PLACE_SUCCESS:
        case GET_PLACES_SUCCESS:
            debugger;
            const addedPlaces = Immutable.OrderedMap(_.mapKeys(action.payload.places, 'id'));
            return state.merge(addedPlaces);
        default:
            return state
    }
}