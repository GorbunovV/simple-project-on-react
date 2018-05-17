import * as auth from '../constants/actions/auth';

function loadState() {
  return {
    isAuth: false,
  };
}

export default function (state = loadState(), action) {
  switch (action.type) {
    case auth.AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAuth: true,
      });

    case auth.AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuth: false,
      });

    case auth.LOGOUT:
      return Object.assign({}, state, {
        isAuth: false,
      });

    default:
      return state;
  }
}
