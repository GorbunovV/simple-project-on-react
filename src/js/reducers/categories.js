import * as categories from '../constants/actions/categories';

function loadState() {
  return {
    collection: null,
    loading: true,
    activeId: null,
  };
}

export default function (state = loadState(), action) {
  switch (action.type) {
    case categories.CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });

    case categories.CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        collection: action.payload,
      });

    case categories.CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    case categories.CATEGORIES_CHANGE:
      return Object.assign({}, state, {
        activeId: action.payload,
      });

    default:
      return state;
  }
}
