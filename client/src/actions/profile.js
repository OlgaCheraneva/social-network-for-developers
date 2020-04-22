import axios from 'axios';

import {
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOSITORIES,
    NO_REPOSITORIES,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    SET_LOADING,
} from './types';
import {setAlert} from './alert';

export const getProfiles = () => async (dispatch) => {
    dispatch({type: SET_LOADING});
    dispatch({type: CLEAR_PROFILE});
    dispatch({type: SET_LOADING});

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
    }
};

export const getProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
    }
};

export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
    }
};

export const getGithubRepositories = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOSITORIES,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: NO_REPOSITORIES,
        });
    }
};

export const createOrUpdateProfile = (
    formData,
    history,
    edit = false
) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
    }
};

export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can not bo undone.')) {
        try {
            await axios.delete('/api/profile');

            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            });
        }
    }
};

export const addExperience = (formData, history) =>
    addProfileInfo(formData, history, 'experience');

export const addEducation = (formData, history) =>
    addProfileInfo(formData, history, 'education');

export const deleteExperience = (id) => deleteProfileInfo(id, 'experience');

export const deleteEducation = (id) => deleteProfileInfo(id, 'education');

function addProfileInfo(formData, history, category) {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.put(
                `/api/profile/${category}`,
                formData,
                config
            );

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data,
            });

            dispatch(setAlert(`${capitalizeWord(category)} Added`, 'success'));

            history.push('/dashboard');
        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
                );
            }

            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            });
        }
    };
}

function deleteProfileInfo(id, category) {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/profile/${category}/${id}`);

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data,
            });

            dispatch(
                setAlert(`${capitalizeWord(category)} Removed`, 'success')
            );
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status,
                },
            });
        }
    };
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}
