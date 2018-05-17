import BaseService from './BaseService';

export default class ProjectService extends BaseService {
  getPage(project, page) {
    return this.guestGet(`projects/pages/${project}/${page}`);
  }
}
