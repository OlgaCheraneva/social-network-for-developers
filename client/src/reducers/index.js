import {combineReducers} from 'redux';

import auth from './auth';
import alert from './alert';
import post from './post';
import profile from './profile';

export default combineReducers({auth, alert, post, profile});
