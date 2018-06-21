import { ERROR_DISMISSED, ERROR_SAVING_PLACE } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case ERROR_DISMISSED:
            return {};
        case ERROR_SAVING_PLACE:
            return {messageId: 'error.savingPlace'};
        default:
            return state;
    }
}