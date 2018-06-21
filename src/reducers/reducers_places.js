import { PLACE_SELECTED, GOOGLE_PLACE_SELECTED, PLACES_RECEIVED } from '../actions/types';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case PLACES_RECEIVED:
            return {suggestions: _.mapKeys(action.payload.places, 'label')};
        case PLACE_SELECTED:
            return {...state, selectedPlace: action.payload};
        case GOOGLE_PLACE_SELECTED:
            const selectedPlace = {
                address: action.payload.formatted_address,
                label: action.payload.name,
                lat: action.payload.geometry.location.lat,
                lon: action.payload.geometry.location.lng
            };
            return {...state, selectedPlace};
        default:
            return state
    }
}