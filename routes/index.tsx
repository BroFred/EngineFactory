import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import App from '../main/App';
import Visx from '../visxs';

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/visx" component={Visx} />
    </Switch>
  </HashRouter>
);

export default BasicRoute;
