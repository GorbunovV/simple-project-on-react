import i18n from 'i18next';
import * as categories from '../constants/actions/categories';
import CategoryService from '../services/CategoryService';
import Notification from '../utils/Notification';

const categoriesService = new CategoryService();

export function loadCategoriesSuccess(data) {
  return {
    type: categories.CATEGORIES_SUCCESS,
    payload: data.collection,
  };
}

function loadCategoriesFailure() {
  Notification.showError(i18n.t('categories_error'));
  return { type: categories.CATEGORIES_FAILURE };
}

function loadCategoriesRequest() {
  return { type: categories.CATEGORIES_REQUEST };
}

export const getCategories = () => (dispatch) => {
  dispatch(loadCategoriesRequest());

  categoriesService.getCategories()
    .then(data => dispatch(loadCategoriesSuccess(data)))
    .catch(err => dispatch(loadCategoriesFailure(err)));
};

export const changeCategory = category => ({
  type: categories.CATEGORIES_CHANGE,
  payload: category,
});
