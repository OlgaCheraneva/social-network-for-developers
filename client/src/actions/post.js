import axios from 'axios';

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
import {setAlert} from '../actions/alert';

export const addPost = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });

        dispatch(setAlert('Post added', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
    }
};

export const getPost = (id) => async (dispatch) => {
    dispatch({type: SET_LOADING});

    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
    }
};

export const getPosts = () => async (dispatch) => {
    dispatch({type: SET_LOADING});

    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id,
        });

        dispatch(setAlert('Post deleted', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
    }
};
