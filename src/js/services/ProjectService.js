import BaseService from './BaseService';

export default class ProjectService extends BaseService {
  getProjects() {
    return this.guestGet('projects');
  }
}
