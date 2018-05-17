import i18n from 'i18next';
import * as page from '../constants/actions/page';
import Notification from '../utils/Notification';

import PageService from '../services/PageService';

const pageService = new PageService();

export function loadPageSuccess(data) {
  return {
    type: page.PAGE_SUCCESS,
    payload: data,
  };
}

function loadPageFailure() {
  Notification.showError(i18n.t('page_error'));
  return { type: page.PAGE_FAILURE };
}

function loadPageRequest() {
  return { type: page.PAGE_REQUEST };
}

export const getPage = (project, pageName) => (dispatch) => {
  dispatch(loadPageRequest());

  pageService.getPage(project, pageName)
    .then(data => dispatch(loadPageSuccess(data)))
    .catch(err => dispatch(loadPageFailure(err)));
};
