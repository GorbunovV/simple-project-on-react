import * as page from '../constants/actions/page';

function loadState() {
  return {
    model: {},
    loading: true,
    title: '',
  };
}

export default function (state = loadState(), action) {
  switch (action.type) {
    case page.PAGE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        model: {},
        title: '',
      });

    case page.PAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        model: action.payload.page,
        title: action.payload.project.name,
      });

    case page.PAGE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
