import { push } from 'react-router-redux';

import * as auth from '../constants/actions/auth';
import AuthService from '../services/AuthService';
import LoginHelper from '../helpers/LoginHelper';

const authService = new AuthService();

export const loginSuccess = data => (dispatch) => {
  LoginHelper.saveLogin(data.token);

  dispatch({
    type: auth.AUTH_SUCCESS,
  });

  dispatch(push('/admin'));
};

function loginFailure(errors) {
  return {
    type: auth.AUTH_FAILURE,
    payload: errors,
  };
}

function loginRequest() {
  return {
    type: auth.AUTH_INIT,
  };
}

export const login = fields => (dispatch) => {
  dispatch(loginRequest());

  authService.authorize(fields)
    .then(data => dispatch(loginSuccess(data)))
    .catch(err => dispatch(loginFailure(err)));
};

export const logout = () => (dispatch) => {
  LoginHelper.removeLogin();

  dispatch(push('/'));

  return {
    type: auth.LOGOUT,
  };
};

export const checkUserAuthentication = () => (dispatch) => {
  const token = LoginHelper.getLogin();

  if (token) {
    dispatch({ type: auth.AUTH_SUCCESS });
  } else {
    dispatch({ type: auth.AUTH_FAILURE });
  }
};

