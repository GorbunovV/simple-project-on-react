import { Promise } from 'bluebird';
import superagent from 'superagent-bluebird-promise';
import i18n from 'i18next';

Promise.config({ warnings: false });

export default class BaseService {
  constructor() {
    this.superAgent = superagent;
    this.baseApiUrl = process.env.API_URL;
  }

  guestPost(path, data) {
    return new Promise((resolve, reject) => {
      this.superAgent
        .post(`${this.baseApiUrl}${path}`)
        .set('Content-Type', 'application/json')
        .send(data)
        .then(response => resolve(response.body))
        .catch((error) => {
          reject(error.body && error.body.errors ? error.body.errors : 'Unknown error');
        });
    });
  }

  guestGet(path) {
    return new Promise((resolve, reject) => {
      this.superAgent
        .get(`${this.baseApiUrl}${path}`)
        .set('Content-Type', 'application/json')
        .set('Accept-Language', i18n.language)
        .then(response => resolve(response.body))
        .catch((error) => {
          reject(error.body && error.body.errors ? error.body.errors : 'Unknown error');
        });
    });
  }
}
