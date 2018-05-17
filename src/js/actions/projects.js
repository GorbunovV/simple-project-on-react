import i18n from 'i18next';
import Notification from '../utils/Notification';
import * as projects from '../constants/actions/projects';
import ProjectService from '../services/ProjectService';

const projectsService = new ProjectService();

export function loadProjectsSuccess(data) {
  return {
    type: projects.PROJECTS_SUCCESS,
    payload: data.collection,
  };
}

function loadProjectsFailure() {
  Notification.showError(i18n.t('projects_error'));
  return { type: projects.PROJECTS_FAILURE };
}

function loadProjectsRequest() {
  return { type: projects.PROJECTS_REQUEST };
}

export const getProjects = () => (dispatch) => {
  dispatch(loadProjectsRequest());

  projectsService.getProjects()
    .then(data => dispatch(loadProjectsSuccess(data)))
    .catch(err => dispatch(loadProjectsFailure(err)));
};

export const searchProject = text => (dispatch) => {
  dispatch({
    type: projects.SEARCH_PROJECT,
    payload: text,
  });
};
