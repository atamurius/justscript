import ReactDOM from 'react-dom';
import React from 'react';
import router from './router';
import store from './store';

window && (window.jQuery = require('jquery'));
ReactDOM.render(router(store), document.getElementById('content'));
