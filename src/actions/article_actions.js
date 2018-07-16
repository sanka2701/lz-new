import { get, post } from './index';
import {GET_ARTICLES_FAILURE, GET_ARTICLES_SUCCESS, POST_PLACE_SUCCESS} from "./types";
import HtmlContentPostprocess from '../utils/html_content_postprocess';

export const postArticle = ({thumbnail, content, ...article}) => async dispatch => {
    try {
        //todo: rework like events posting to form data and let server handle urls substitution
        const processor = new HtmlContentPostprocess();
        article.thumbnail = thumbnail instanceof File ? await processor.uploadImg(thumbnail): thumbnail;
        article.content = await processor.postProcess(content);

        const request = {
            endpoint: 'articles',
            payload: article,
            successAction: POST_PLACE_SUCCESS,
            failureAction: POST_PLACE_SUCCESS
        };
        await dispatch(post(request));
    } catch (error) {
        debugger;
        //todo: dispatch action to set error
        console.error('ERROR PROCESSING ARTICLE', error);
    }
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