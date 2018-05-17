import BaseService from './BaseService';

export default class ProjectService extends BaseService {
  getPages(path) {
    return this.guestGet(`projects/pages/${path}`);
  }
}
