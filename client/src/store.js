import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import setAuthToken from './utils/setAuthToken';

import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

let currentState = {auth: {token: null}};

store.subscribe(() => {
    let previousState = currentState;
    currentState = store.getState();
    if (previousState.auth.token !== currentState.auth.token) {
        const token = currentState.auth.token;
        setAuthToken(token);
    }
});

export default store;
