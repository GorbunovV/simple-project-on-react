import BaseService from './BaseService';

export default class CategoryService extends BaseService {
  getCategories() {
    return this.guestGet('categories');
  }
}
