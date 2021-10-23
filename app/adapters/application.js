import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api';
  host = 'http://127.0.0.1:8000';
  @service session;

  buildURL(...args) {
    return `${super.buildURL(...args)}/`;
  }

  @computed('session.data.authenticated.token')
  get headers() {
    let _headers = {};
    if (this.session.isAuthenticated) {
      _headers['Token'] = this.session.data.authenticated.token;
    }

    return _headers;
  }
}
