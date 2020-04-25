import {
    ADD_POST,
    GET_POST,
    GET_POSTS,
    DELETE_POST,
    UPDATE_LIKES,
    POST_ERROR,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SET_LOADING,
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
                loading: false,
            };
        case UPDATE_LIKES:
            const {id, likes} = action.payload;
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === id ? {...post, likes} : post
                ),
                loading: false,
            };
        case POST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
