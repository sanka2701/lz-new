import { EVENTS_LOADED, EVENT_LOADED } from '../actions/types'
import _ from 'lodash';

export default function (state = {}, action) {
    switch(action.type) {
        case EVENT_LOADED:
            return { ...state, [action.payload.event.id] : action.payload.event };
        case EVENTS_LOADED:
            return _.mapKeys(action.payload.events, "id");
        default:
            return state;
    }
}