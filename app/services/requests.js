import ENV from 'papermerge/config/environment';
import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default class Requests extends Service {
  @service session;

  async runOCR(document_version_id) {
    let url;

    url = `${this.base_url}ocr/`;

    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({document_version_id})
    });
  }

  get base_url() {
    return `${ENV.APP.HOST}/${ENV.APP.NAMESPACE}/`;
  }

  @computed('session.data.authenticated.token', 'session.isAuthenticated')
  get headers() {
    let _headers = {},
      token;

    if (this.session.isAuthenticated) {
      token = this.session.data.authenticated.token;
      _headers['Authorization'] = `Token ${token}`;
    }

    return _headers;
  }

}
