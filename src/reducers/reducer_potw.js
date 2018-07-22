import _ from 'lodash';
import { GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE, GET_PHOTOS_REQUEST } from "../actions/types";

const defaultState = {
    byId: {},
    ids: [],
    isLoading: false
};

export default function (state = defaultState, action) {
    switch(action.type) {
        case GET_PHOTOS_SUCCESS:
            const { photos } = action.payload;
            return {
                ...state,
                byId: _.mapKeys(photos, 'id'),
                ids: _.map(photos, 'id'),
                isLoading: false
            };
        case GET_PHOTOS_FAILURE:
            return {...state, isLoading: false};
        case GET_PHOTOS_REQUEST:
            return {...state, isLoading: true};
        default:
            return state;
    }
}