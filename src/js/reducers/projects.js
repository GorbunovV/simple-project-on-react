import * as projects from '../constants/actions/projects';

function loadState() {
  return {
    collection: null,
    loading: true,
    search: '',
  };
}

export default function (state = loadState(), action) {
  switch (action.type) {
    case projects.PROJECTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        connection: null,
      });

    case projects.PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        collection: action.payload,
      });

    case projects.PROJECTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    case projects.SEARCH_PROJECT:
      return Object.assign({}, state, {
        loading: false,
        search: action.payload,
      });

    default:
      return state;
  }
}
