import RESTAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAdapter {
  namespace = 'api';
  host = "http://127.0.0.1:8000"

  buildURL(...args) {
    return `${super.buildURL(...args)}/`;
  }
}
