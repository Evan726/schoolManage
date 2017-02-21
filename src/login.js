require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('es6-promise');
require('fetch-ie8');
import React from "react";
import ReactDOM from "react-dom";
import {
	Provider
} from 'react-redux';

import configureStore from './store/configureStore';
const store = configureStore();

import Login from "./containers/Login";
require('./static/css/common.less');
require('./static/css/login.less');

ReactDOM.render(
	<Provider store={store}>
        <Login/>
    </Provider>,
	document.getElementById('app')
)