import {v4 as uuid} from 'uuid';

import {SET_ALERT, REMOVE_ALERT} from './types';

export const setAlert = (message, type, timeout = 3000) => (dispatch) => {
    const id = uuid();

    dispatch({
        type: SET_ALERT,
        payload: {
            id,
            message,
            type,
            timeout,
        },
    });

    setTimeout(
        () =>
            dispatch({
                type: REMOVE_ALERT,
                payload: id,
            }),
        timeout
    );
};
