import * as project from '../constants/actions/pages';

function loadState() {
  return {
    collection: null,
    loading: true,
    title: '',
  };
}

export default function (state = loadState(), action) {
  switch (action.type) {
    case project.PAGES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        collection: null,
        title: '',
      });

    case project.PAGES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        collection: action.payload.pages,
        title: action.payload.project.name,
      });

    case project.PAGES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
