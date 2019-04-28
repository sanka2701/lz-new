import {ERROR_DISMISSED, ERROR_SAVING_PLACE, GET_EVENTS_FAILURE, POST_EVENT_FAILURE} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case ERROR_DISMISSED:
            return {};
        case ERROR_SAVING_PLACE:

        case GET_EVENTS_FAILURE:
        case POST_EVENT_FAILURE:
            return {messageId: 'error.backend.saving', detail: action.payload};

        default:
            return state;
    }
}