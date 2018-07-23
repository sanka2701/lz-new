import { post, get } from './index';
import {
    GET_EVENTS_SUCCESS,
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_FAILURE,
    GET_PHOTOS_SUCCESS,
    POST_PHOTO_FAILURE,
    POST_PHOTO_SUCCESS
} from "./types";

const toFormData = async ({ photoFile, ...weeklyPhoto }) => {
    const formData = new FormData();

    formData.append('json', JSON.stringify(weeklyPhoto));
    photoFile instanceof File
        ? formData.append('file', photoFile)
        : weeklyPhoto.photoFile = photoFile;

    return formData;
};

const buildRequest = ( weeklyPhoto, endpoint ) => {
    return {
        endpoint: endpoint,
        payload: toFormData(weeklyPhoto),
        successAction: POST_PHOTO_SUCCESS,
        failureAction: POST_PHOTO_FAILURE
    }
};

export const postPhoto = ( weeklyPhoto ) => (dispatch) => {
    const request = buildRequest(weeklyPhoto, 'potw');
    dispatch(post(request));
};

export const updatePhoto = ( weeklyPhoto ) => (dispatch) => {
    const request = buildRequest(weeklyPhoto, 'potw/update');
    dispatch(post(request));
};

export const requestPhotos = () => {
    return {
        type: GET_PHOTOS_REQUEST
    }
};

export const loadPhotoById = id => dispatch => {
    dispatch(requestPhotos());
    const request = {
        endpoint: 'potw',
        params: { id },
        successAction: GET_PHOTOS_SUCCESS,
        failureAction: GET_PHOTOS_FAILURE
    };
    dispatch(get(request));
};

export const loadAllPhotos = filter => dispatch => {
    dispatch(requestPhotos());
    const request = {
        endpoint: 'potw/list',
        successAction: GET_EVENTS_SUCCESS,
        failureAction: GET_PHOTOS_FAILURE
    };
    dispatch(get(request));
};