import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import ENV from 'papermerge/config/environment';


export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = ENV.APP.NAMESPACE;
  host = ENV.APP.HOST;
  @service requests;

  buildURL(...args) {
    let ret = super.buildURL(...args);

    if (ret.substr(-1) === '/') {
      return ret;
    }
    return `${ret}/`;
  }

  get headers() {
    return this.requests.headers;
  }
}
