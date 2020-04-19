import axios from 'axios';

import {GET_PROFILE, PROFILE_ERROR} from './types';

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
