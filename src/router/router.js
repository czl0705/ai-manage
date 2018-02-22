import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Bundle from './Bundle';

import Loading from 'components/Loading/loading';
import Home from 'bundle-loader?loazy&name=home!pages/Home/home';
import Page1 from 'bundle-loader?loazy&name=page1!pages/Page1/page1';
import Counter from 'bundle-loader?loazy&name=counter!pages/Counter/counter';
import UserInfo from 'bundle-loader?loazy&name=userInfo!pages/UserInfo/userInfo';
import NotFound from 'bundle-loader?loazy&name=notFound!pages/NotFound/notFound';

// const Loading = function () {
//     return <div>Loading...</div>
// }

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props}/> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route path="/page1" component={createComponent(Page1)}/>
            <Route path="/counter" component={createComponent(Counter)}/>
            <Route path="/userinfo" component={createComponent(UserInfo)}/>
            <Route component={createComponent(NotFound)}/>
        </Switch>
    </div>
);
export default getRouter;
