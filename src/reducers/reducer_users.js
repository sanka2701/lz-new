import { USERS_LOADED} from '../actions/types';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case USERS_LOADED:
            return _.mapKeys(action.payload.users, 'id');
        default:
            return state
    }
}