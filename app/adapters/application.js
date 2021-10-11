import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api';
  host = 'http://127.0.0.1:8000';

  buildURL(...args) {
    return `${super.buildURL(...args)}/`;
  }
}
