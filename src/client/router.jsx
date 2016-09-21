import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import Layout from './layout';

const page = name => require(`./pages/${name}`).default;

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={ page('index') } />
      <Route path="/test" component={ page('test') } />
    </Route>
  </Router>
);
