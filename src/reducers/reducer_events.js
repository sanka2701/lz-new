import { GET_EVENTS_SUCCESS } from '../actions/types'
import _ from 'lodash';

export default function (state = {}, action) {
    switch(action.type) {
        case GET_EVENTS_SUCCESS:
            //todo: consider filtering events on event_list by approved
            // return  {...state, ..._.mapKeys(action.payload.events, "id")};
            return  _.mapKeys(action.payload.events, "id");
        default:
            return state;
    }
}