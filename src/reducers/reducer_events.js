import { CHANGE_EVENT_PAGE, GET_EVENTS_SUCCESS } from '../actions/types'
import { POSTS_PER_PAGE } from '../utils/constant';
import _ from 'lodash';

const DEFAULT_STATE = {
    byId: {},
    ids: [],
    currentPage: 1,
    pageCount: 1,
    pages: []
};

export default function (state = DEFAULT_STATE, action) {
    switch(action.type) {
        case CHANGE_EVENT_PAGE:
            return {...state, currentPage: action.payload.pageIndex};
        case GET_EVENTS_SUCCESS:
            const {events} = action.payload;
            return {
                ...state,
                byId: _.mapKeys(events, 'id'),
                ids: _.map(events, 'id'),
                pageCount: Math.ceil(events.length/POSTS_PER_PAGE),
                pages: _.chunk(_.map(events, 'id'), POSTS_PER_PAGE)
            };
        default:
            return state;
    }
}