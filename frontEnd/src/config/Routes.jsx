import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

const Routes = () => {
    return (
        <Switch>
            <Route
                path='/login'
                exact
                component={Login}
            />
            <Route
                path='/signup'
                exact
                component={Signup}
            />
            <Route
                path='/dashboard'
                exact
                component={Home}
            />
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />
        </Switch>
    );
}

export default Routes;
