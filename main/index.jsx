import React from 'react';
import ReactDOM from 'react-dom';
// import BasicRoute from '../routes';
import { Auth0Provider } from '@auth0/auth0-react';

import BasicRoute from './App';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain="dev-i7q374rd.us.auth0.com"
    clientId="SWgW2Txl49Ap12Em6m5Thk1rlbnt7IhS"
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience="https://dev-i7q374rd.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata create:current_user_metadata"
  >
    {' '}
    <BasicRoute />

  </Auth0Provider>,
  document.getElementById('root'),
);
