import { get, post } from './index';
import {
  CHANGE_ARTICLE_PAGE,
  GET_ARTICLES_FAILURE,
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  POST_ARTICLE_SUCCESS,
  POST_ARTICLE_FAILURE } from "./types";
import HtmlContentPostprocess from '../utils/html_content_postprocess';
import _ from "lodash";

const toFormData = async ({ thumbnail, ...article }) => {
    const processor = new HtmlContentPostprocess();
    const files = await processor.getContentFiles(article.content);

    const formData = new FormData();
    formData.append('article', JSON.stringify(article));
    _.forEach(files, ( file, url ) => {
        formData.append('fileUrls', url);
        formData.append('file', file);
    });
    thumbnail instanceof File
        ? formData.append('thumbnail', thumbnail)
        : article.thumbnail = thumbnail;

    return formData;
};

const buildRequest = async ( article, endpoint ) => {
    return {
        endpoint: endpoint,
        payload: await toFormData(article),
        successAction: POST_ARTICLE_SUCCESS,
        failureAction: POST_ARTICLE_FAILURE
    }
};

export const postArticle = (article) => async dispatch => {
    const request = await buildRequest(article, 'articles');
    await dispatch(post(request));
};

export const updateArticle = (article) => async dispatch => {
    const request = await buildRequest(article, 'articles/update');
    await dispatch(post(request));
};

export const setArticlesPagination = (pageIndex) => {
    return {
        type: CHANGE_ARTICLE_PAGE,
        payload: {pageIndex}
    }
};

export const requestArticles = () => {
    return {
        type: GET_ARTICLES_REQUEST
    }
};

export const loadArticleById = id => dispatch => {
    dispatch(requestArticles());
    const request = {
        endpoint: 'articles',
        params: { id },
        successAction: GET_ARTICLES_SUCCESS,
        failureAction: GET_ARTICLES_FAILURE
    };
    dispatch(get(request));
};

export const loadArticlesByFilter = filter => dispatch => {
    dispatch(requestArticles());
    const request = {
        endpoint: 'articles/filter',
        params: {},
        payload: {...filter},
        successAction: GET_ARTICLES_SUCCESS,
        failureAction: GET_ARTICLES_FAILURE
    };
    dispatch(post(request));
};