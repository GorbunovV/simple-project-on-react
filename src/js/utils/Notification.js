import { NotificationManager } from 'react-notifications';
import i18n from 'i18next';

class Notification {
  constructor() {
    this.successText = i18n.t('msg_success');
    this.errorText = i18n.t('msg_error');
  }

  showSuccess(msg) {
    NotificationManager.success(msg || this.successText);
  }

  showError(msg) {
    NotificationManager.error(msg || this.errorText);
  }
}

export default new Notification();
