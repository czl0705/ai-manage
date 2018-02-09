import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';
import {AppContainer} from 'react-hot-loader';
// import Hello from './components/Hello/hello';


// 定义渲染函数
function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            {RootElement}
        </AppContainer>,
        document.getElementById('app')
    );
}

// 初始化
renderWithHotReload(getRouter());

// 热更新
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router').default;
        renderWithHotReload(getRouter());
    });
}