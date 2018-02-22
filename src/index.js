import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';
// import getRouter from 'router/router';
// import Hello from './components/Hello/hello';
import {BrowserRouter as Router} from 'react-router-dom';
import App from 'components/App/app';

if (MOCK) {
    require('mock/mock');
}

// 定义渲染函数
function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <RootElement/>
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
}

// 初始化
renderWithHotReload(App);

// 热更新
if (module.hot) {
    module.hot.accept('components/App/app', () => {
        const NextApp = require('components/App/app').default;
        renderWithHotReload(NextApp);
    });
}