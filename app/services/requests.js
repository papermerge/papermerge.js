import ENV from 'papermerge/config/environment';
import Service from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default class Requests extends Service {
  @service session;

  async runOCR({doc_id, lang}) {
    /*
      Request sent with ContentType: application/json
    */
    let url, headers_copy = {};

    url = `${this.base_url}ocr/`;

    Object.assign(headers_copy, this.headers);  // create a copy of `this.headers`
    headers_copy['Content-Type'] = 'application/json';
    headers_copy['Accept'] = 'application/json';

    return fetch(url, {
      method: 'POST',
      headers: headers_copy,
      body: JSON.stringify({doc_id, lang})
    });
  }

  get base_url() {
    return `${ENV.APP.HOST}/${ENV.APP.NAMESPACE}/`;
  }

  @computed('session.{data.authenticated.token,isAuthenticated}')
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
