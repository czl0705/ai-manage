import axios from 'axios';

export default store => next => action => {
    const {dispatch, getState} = store;

    // 如果dispatch来的是一个function，此处不做处理，直接进入下一级
    if (typeof action === 'function') {
        action(dispatch, getState);
        return;
    }

    // 解析action
    // ...rest写法：表示参数一一对应
    const {promise, types, afterSuccess, ...rest} = action;

    // 没有promise，证明不是想要发送ajax请求的，直接进入下一步！
    if (!action.promise) {
        return next(action);
    }

    // 解析types
    const [REQUEST, SUCCESS, FAILURE] = types;

    // 开始请求
    next({
        ...rest,
        type: REQUEST
    });

    // 请求成功
    const onFulfilled = result => {
        next({
            ...rest,
            result,
            type: SUCCESS
        });

        // 请求成功的下一步操作
        if (afterSuccess) {
            afterSuccess(dispatch, getState, result);
        }
    }

    // 请求失败
    const onRejected = error => {
        next({
            ...rest,
            error,
            type: FAILURE
        });
    }

    return promise(axios).then(onFulfilled, onRejected).catch(error => {
        console.log('userInfoMiddleware ERROR:', error);
        onRejected(error);
    })
}