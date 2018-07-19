import { createSelector } from 'reselect';
import { POSTS_PER_PAGE } from '../utils/constant';
import _ from 'lodash';

const getCurrentPage = (state, reducer) => state[reducer].currentPage;
const getPostIds = (state, reducer) => state[reducer].ids;
const getPosts = (state, reducer) => state[reducer].byId;

export const makeGetPostsByPage = () => createSelector(
    [ getPosts, getCurrentPage, getPostIds ],
    ( posts, currentPage, ids ) => {
        return {
            byId: _.mapKeys(posts, 'id'),
            pageCount: Math.ceil(ids.length / POSTS_PER_PAGE),
            pages: _.chunk(ids, POSTS_PER_PAGE),
            currentPage,
            ids
        }
    }
);


