import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';

import AdminApplication from './containers/AdminApplication';
import GuestApplication from './containers/GuestApplication';

import { getUserLanguage } from './helpers/i18n';

import { checkUserAuthentication } from './actions/auth';

class Application extends Component {
  componentWillMount() {
    this.props.dispatch(checkUserAuthentication());
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin" component={AdminApplication} />
          <Route path="/:locale" component={GuestApplication} />
          <Route render={() => <Redirect to={`/${getUserLanguage()}`} />} />
        </Switch>

        <NotificationContainer />
      </div>
    );
  }
}

Application.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default translate(['common'], { wait: true })(withRouter(connect()(Application)));
