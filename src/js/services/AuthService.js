import BaseService from './BaseService';

export default class AuthService extends BaseService {
  authorize(fields) {
    return this.guestPost('auth/login', fields);
  }
}
