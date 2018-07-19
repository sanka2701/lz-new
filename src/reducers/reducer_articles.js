import {CHANGE_ARTICLE_PAGE, GET_ARTICLES_FAILURE, GET_ARTICLES_REQUEST, GET_ARTICLES_SUCCESS} from '../actions/types'
import _ from 'lodash';

const defaultState = {
    byId: {},
    ids: [],
    isLoading: false,
    currentPage: 1
};

export default function (state = defaultState, action) {
    switch(action.type) {
        case GET_ARTICLES_SUCCESS:
            const {articles} = action.payload;
            return {
                ...state,
                byId: _.mapKeys(articles, 'id'),
                ids: _.map(articles, 'id'),
                isLoading: false
            };
        case GET_ARTICLES_FAILURE:
            return {...state, isLoading: false};
        case GET_ARTICLES_REQUEST:
            return {...state, isLoading: true};
        case CHANGE_ARTICLE_PAGE:
            return {...state, currentPage: action.payload.pageIndex};

        default:
            return state;
    }
}