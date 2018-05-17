import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LoginForm } from 'blakit-react-material-components';

import { login } from '../../actions/auth';

class LoginPage extends Component {
  componentWillMount() {
    const { history, isAuth } = this.props;

    if (isAuth) {
      history.push('/admin');
    }
  }

  onSubmit(val) {
    const { dispatch } = this.props;
    dispatch(login(val));
  }

  render() {
    return (
      <LoginForm
        onSubmit={val => this.onSubmit(val)}
        errors={this.props.errors}
        loading={this.props.loading}
      />
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.array),
  loading: PropTypes.bool,
  isAuth: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
};
LoginPage.defaultProps = {
  errors: {},
  loading: false,
  isAuth: false,
  history: null,
};

const mapStateToProps = state => ({
  errors: state.auth.errors,
  loading: state.auth.loading,
  isAuth: state.user.isAuth,
});

export default withRouter(connect(mapStateToProps)(LoginPage));
