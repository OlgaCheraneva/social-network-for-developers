import axios from 'axios';

import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from './types';
import {setAlert} from './alert';

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

export const addExperience = (formData, history) =>
    addProfileInfo(formData, history, 'experience');

export const addEducation = (formData, history) =>
    addProfileInfo(formData, history, 'education');

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

            const categoryName =
                category[0].toUpperCase() + category.substring(1).toLowerCase();
            dispatch(setAlert(`${categoryName} Added`, 'success'));

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
