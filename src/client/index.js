import ReactDOM from 'react-dom';
import React from 'react';
import router from './router';
import store from './store';

ReactDOM.render(router(store), document.getElementById('content'));
