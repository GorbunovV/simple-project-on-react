import i18n from 'i18next';
import Notification from '../utils/Notification';
import * as project from '../constants/actions/pages';
import PagesService from '../services/PagesService';

const pagesService = new PagesService();

export function loadPagesSuccess(data) {
  return {
    type: project.PAGES_SUCCESS,
    payload: data,
  };
}

function loadPagesFailure() {
  Notification.showError(i18n.t('project_error'));
  return { type: project.PAGES_FAILURE };
}

function loadPagesRequest() {
  return { type: project.PAGES_REQUEST };
}

export const getPages = path => (dispatch) => {
  dispatch(loadPagesRequest());

  pagesService.getPages(path)
    .then(data => dispatch(loadPagesSuccess(data)))
    .catch(err => dispatch(loadPagesFailure(err)));
};
