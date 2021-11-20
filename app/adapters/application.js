import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api';
  host = 'http://127.0.0.1:8000';
  @service session;

  buildURL(...args) {
    let ret = super.buildURL(...args);

    if (ret.substr(-1) === '/') {
      return ret;
    }
    return `${ret}/`;
  }
  /*
  pathForType(modelName) {
    let ret = super.pathForType(modelName);

    // `nodes` is polymorphic endpoint
    // with POST /api/nodes/ we can create a Folder
    // or a Document
    if (modelName == 'folder') {
      return 'nodes';
    } else if (modelName == 'document') {
      return 'nodes';
    }

    return ret;
  }
  */

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
