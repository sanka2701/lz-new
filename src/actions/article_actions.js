import { get, post } from './index';

export const postArticle = article => dispatch => {
    const request = {
        endpoint: 'articles',
        payload: article,
        successAction: 'ok',
        failureAction: 'nok'
    };
    dispatch(post(request));
};