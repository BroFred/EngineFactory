import React from 'react';
import {
    HashRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import App from '../main/App';
import Visx from '../visxs';


const BasicRoute = () => {
    return (
        <HashRouter>
          <Switch>
            <Route exact path='/' component={App}>
            </Route>
            <Route exact path='/visx' component={Visx} >
            </Route>
          </Switch>
        </HashRouter>
    );
  };

  export default  BasicRoute