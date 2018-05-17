import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminMain from '../containers/admin/AdminMain';
import LoginPage from '../containers/admin/LoginPage';

class AdminApplication extends Component {
  renderContainer() {
    const { isAuth } = this.props;

    if (!isAuth) {
      return <Redirect to="admin/login" />;
    }

    return <AdminMain />;
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin"
          render={() => this.renderContainer()}
        />
        <Route exact path="/admin/login" component={LoginPage} />
      </Switch>
    );
  }
}

AdminApplication.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

AdminApplication.defaultProps = {};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    isAuth: user.isAuth,
  };
};

export default connect(mapStateToProps)(AdminApplication);
