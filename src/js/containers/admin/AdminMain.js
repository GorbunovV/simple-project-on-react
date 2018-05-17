import React, { Component } from 'react';
import { Menu } from 'blakit-react-material-components';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

import AdminDashboard from './AdminDashboard';

class AdminMain extends Component {
  onLogout() {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    return (
      <div className="wrapper">
        <div className="wrapper__inner">
          <Menu
            brand="WebStage Admin"
            onLogoutClick={() => this.onLogout()}
            links={[
              {
                to: '/admin/projects',
                link: 'Проекты',
                notify: 10,
                countLoading: false,
              },
              {
                to: '/admin/categories',
                link: 'Категории',
              },
            ]}
          />

          <Switch>
            <Route exact path="/admin" component={AdminDashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

AdminMain.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
AdminMain.defaultProps = {};

export default connect()(AdminMain);
