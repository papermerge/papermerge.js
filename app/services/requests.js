import Service from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { service } from '@ember/service';
import { base_url } from 'papermerge/utils';


export default class Requests extends Service {
  @service session;

  async runOCR({doc_id, lang}) {
    /*
      Request sent with ContentType: application/json
    */
    let url, headers_copy = {};

    url = `${base_url()}/ocr/`;

    Object.assign(headers_copy, this.headers);  // create a copy of `this.headers`
    headers_copy['Content-Type'] = 'application/json';
    headers_copy['Accept'] = 'application/json';

    return fetch(url, {
      method: 'POST',
      headers: headers_copy,
      body: JSON.stringify({doc_id, lang})
    });
  }

  async downloadDocumentVersion(document_version) {
    /*
      `document_version` contains following attributes:
        id
        number
        file_name
        lang
        pages
        size
        page_count
        short_description

      attributes which correspond to server side (or client side) DocumentVersion model
    */
    let url, headers_copy = {};

    url = `${base_url()}/document-versions/${document_version.id}/download/`;
    Object.assign(headers_copy, this.headers);
     //headers_copy['Access-Control-Allow-Origin'] = ENV.APP.HOST;

    return fetch(url, {
      method: 'GET',
      headers: headers_copy
    }).then(
      response => response.blob()
    ).then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');

      a.href = url;
      a.download = document_version.file_name;
      // we need to append the element to the dom -> otherwise it will not
      // work in firefox
      document.body.appendChild(a);
      a.click();
      //afterwards we remove the element again
      a.remove();
    });
  }

  async nodesMove(data) {
    let url, headers_copy = {};

    url = `${base_url()}/nodes/move/`;

    Object.assign(headers_copy, this.headers);  // create a copy of `this.headers`
    headers_copy['Content-Type'] = 'application/json';

    return fetch(url, {
      method: 'POST',
      headers: headers_copy,
      body: JSON.stringify(data)
    });
  }

  async search(query) {
    let url;

    url = `${base_url()}/search/?q=${query}`;

    return fetch(url, {
      method: 'GET',
      headers: this.headers
    })
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
