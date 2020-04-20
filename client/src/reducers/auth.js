import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    user: null,
    loading: true,
    token: localStorage.getItem('token'),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: action.payload.token,
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};
