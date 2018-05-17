import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import RedBox from 'redbox-react';
import { Provider } from 'react-redux';
import * as log from 'loglevel';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-notifications/lib/notifications.css';
import { history, store } from './bootstrap/index';
import i18n from './helpers/i18n';

import '../scss/main.scss';

import Application from './Application';

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider>
          <Application />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </I18nextProvider>
);

const root = document.getElementById('app');

const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  log.disableAll();
} else {
  log.enableAll();
}

if (NODE_ENV === 'development') {
  try {
    render(<App />, root);
  } catch (e) {
    render(<RedBox error={e} />, root);
  }
} else {
  render(<App />, root);
}
