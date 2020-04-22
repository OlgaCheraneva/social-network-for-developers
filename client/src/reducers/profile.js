import {
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOSITORIES,
    NO_REPOSITORIES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repositories: [],
    loading: true,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false,
            };
        case GET_REPOSITORIES:
            return {
                ...state,
                repositories: action.payload,
                loading: false,
            };
        case NO_REPOSITORIES:
            return {
                ...state,
                repositories: [],
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repositories: [],
                loading: false,
            };
        default:
            return state;
    }
};
