import { GET_ARTICLES_SUCCESS } from '../actions/types'
import _ from 'lodash';

export default function (state = {}, action) {
    switch(action.type) {
        case GET_ARTICLES_SUCCESS:
            return {...state, ..._.mapKeys(action.payload.articles, "id")};
        default:
            return state;
    }
}