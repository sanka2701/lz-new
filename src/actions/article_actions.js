import { get, post } from './index';
import {GET_ARTICLES_FAILURE, GET_ARTICLES_SUCCESS, POST_PLACE_SUCCESS} from "./types";
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
        successAction: POST_PLACE_SUCCESS,
        failureAction: POST_PLACE_SUCCESS
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

export const loadArticleById = id => dispatch => {
    const request = {
        endpoint: 'articles',
        params: { id },
        successAction: GET_ARTICLES_SUCCESS,
        failureAction: GET_ARTICLES_FAILURE
    };
    dispatch(get(request));
};

export const loadArticlesByFilter = filter => dispatch => {
    const request = {
        endpoint: 'articles/filter',
        params: {},
        payload: {...filter},
        successAction: GET_ARTICLES_SUCCESS,
        failureAction: GET_ARTICLES_FAILURE
    };
    dispatch(post(request));
};