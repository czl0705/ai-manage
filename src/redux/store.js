import {createStore, applyMiddleware} from 'redux';
// import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers.js';
import userInfoMiddleware from './middleware/userInfoMiddleware';

let store = createStore(combineReducers, applyMiddleware(userInfoMiddleware));

// 热更新
if (module.hot) {
    module.hot.accept("./reducers", () => {
        const nextCombineReduces = require("./reducers").default;
        store.replaceReducer(nextCombineReduces);
    });
}

export default store;