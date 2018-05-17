import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';
import * as log from 'loglevel';

import reducer from '../reducers/index';

export const history = createHistory();

let middleware = [
  thunk,
  routerMiddleware(history),
];
log.error('log message');

if (process.env.SENTRY_ENABLED !== '0' && process.env.SENTRY_ENABLED.toUpperCase() !== 'FALSE') {
  Raven.config(process.env.SENTRY_DSN, {
    release: RELEASE,
    environment: process.env.NODE_ENV,
  }).install();

  middleware = [...middleware, createRavenMiddleware(Raven)];
}
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
