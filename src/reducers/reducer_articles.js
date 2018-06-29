import { ARTICLE_LOADED, ARTICLES_LOADED } from '../actions/types'
import _ from 'lodash';

export default function (state = {}, action) {
    switch(action.type) {
        case ARTICLE_LOADED:
            return { ...state, [action.payload.article.id] : action.payload.event };
        case ARTICLES_LOADED:
            return _.mapKeys(action.payload.articles, "id");
        default:
            return state;
    }
}