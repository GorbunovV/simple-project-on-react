import * as auth from '../constants/actions/auth';

function loadState() {
  return {
    errors: null,
    loading: false,
  };
}

export default function (state = loadState(), action) {
  switch (action.type) {
    case auth.AUTH_INIT:
      return Object.assign({}, state, {
        loading: true,
      });

    case auth.AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
      });

    case auth.AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        errors: action.payload,
      });

    default:
      return state;
  }
}
