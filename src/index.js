import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux'
import { store } from './app/store.js';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>

      <Auth0Provider
        domain="dev-7widvi6xw2aehtfr.us.auth0.com"
        clientId="AIpFwqYHY7VP8oj283Df9iqRREotoxjl"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>,
    </Provider>
);

reportWebVitals();
