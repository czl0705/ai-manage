import {createStore, applyMiddleware} from 'redux';
// import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers.js';
import userInfoMiddleware from './middleware/userInfoMiddleware';

let store = createStore(combineReducers, applyMiddleware(userInfoMiddleware));

export default store;