import LS from '../utils/localStorage';

const Authorization = 'Authorization';

class LoginHelper {
  static getLogin() {
    return LS.get(Authorization);
  }

  static saveLogin(token) {
    return LS.add(Authorization, token);
  }

  static removeLogin() {
    return LS.remove(Authorization);
  }
}

export default LoginHelper;
