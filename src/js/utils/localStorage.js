const config = {
  localStorage: {
    name: 'App',
  },
};

export default class LS {
  static get(field) {
    if (LS.isExists()) {
      const data = JSON.parse(localStorage.getItem(config.localStorage.name));

      if (!field) return data;
      if (data[field]) return data[field];

      return undefined;
    }

    return undefined;
  }

  static add(field, data = {}) {
    let dataToStorage = {};

    if (field) {
      dataToStorage = LS.get();
      if (!dataToStorage) dataToStorage = {};
      dataToStorage[field] = data;
    } else {
      dataToStorage = data;
    }

    localStorage.setItem(config.localStorage.name, JSON.stringify(dataToStorage));
  }

  static remove(field) {
    let dataToStorage = {};

    if (field) {
      dataToStorage = LS.get();
      if (!dataToStorage) dataToStorage = {};
      localStorage.removeItem(config.localStorage.name, field);
    }
  }

  static isExists() {
    return !!localStorage.getItem(config.localStorage.name);
  }
}
