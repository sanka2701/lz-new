import {GET_EVENTS_REQUEST, CHANGE_EVENT_PAGE, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE} from '../actions/types';
import _ from 'lodash';

const defaultState = {
    byId: {},
    ids: [],
    isLoading: false,
    currentPage: 1
};

export default function (state = defaultState, action) {
    switch(action.type) {
        case GET_EVENTS_SUCCESS:
            const {events} = action.payload;
            return {
                ...state,
                byId: _.mapKeys(events, 'id'),
                ids: _.map(events, 'id'),
                isLoading: false
            };
        case GET_EVENTS_FAILURE:
            return {...state, isLoading: false};
        case GET_EVENTS_REQUEST:
            return {...state, isLoading: true};
        case CHANGE_EVENT_PAGE:
            return {...state, currentPage: action.payload.pageIndex};
        default:
            return state;
    }
}