import { AUTH_USER, AUTH_ERROR, AUTH_USER_OUT } from '../actions/types';

const INITIAL_STATE = {
    user: null,
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            debugger;

            localStorage.setItem('token', action.payload.token);
            return { ...state, user: action.payload.user };
        case AUTH_ERROR:
            debugger;

            return { ...state, errorMessage: action.payload };
        case AUTH_USER_OUT:
            debugger;

            localStorage.removeItem('token');
            return { ...state, user: null};
        default:
            return state;
    }
}