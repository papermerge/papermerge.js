import Service from '@ember/service';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { service } from '@ember/service';
import {
  insert_blob,
  extract_file_name
} from 'papermerge/utils';
import { get_id } from 'papermerge/utils/array';
import { task } from 'ember-concurrency';

import { base_url } from 'papermerge/utils/host';
import ENV from 'papermerge/config/environment';



export default class Requests extends Service {
  @service session;
  @service store;

  async getImage(page_id, accept='image/jpeg', cache=undefined) {
    /*
    * Requests binary image/jpeg from backend of the
    * page model based on `page_id`
    */
    let url, headers_copy = {};

    url = `${base_url()}/pages/${page_id}/`;

    // Important! don't change original this.headers
    // otherwise `PageAdapter` will continue
    // accepting only 'image/jpeg' content type for all subsequent requests
    Object.assign(headers_copy, this.headers);  // create a copy of `this.headers`
    headers_copy['Accept'] = accept;

    return fetch(url, {
      method: 'GET',
      headers: headers_copy,
      cache: cache || ENV.APP.FETCH_CACHE
    });
  }

  async loadImages(pages, accept='image/jpeg', cache=undefined) {
    let all_proms,
      pages_with_url;

    all_proms = pages.map(
      (page) => this.loadImage(page, accept, cache)
    );

    pages_with_url = await Promise.all(all_proms);
    return pages_with_url;
  }

  @task *loadImage(page, accept='image/jpeg', cache=undefined) {
    /*
    * Requests page's image from backend

      It can request image/jpeg or image/svg+xml. In case it asks
      for image/svg+xml media type and svg image is not available,
      server will return jpeg instead.
      Server will return 404 only in case neither svg nor jpeg images
      are available.
    */
    let response,
      image_blob,
      image_object_url;

    response = yield this.getImage(page.id, accept, cache);

    if (response.headers.get('content-type') == 'image/svg+xml') {
      page.svg_image = yield response.text();
    } else {
      image_blob = yield response.blob();
      image_object_url = URL.createObjectURL(image_blob);
      page.url = image_object_url;
    }

    return page;
  }

  async getOCRedText({doc_id}) {
    return this._get(`/documents/${doc_id}/ocr-text`);
  }

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

  async deletePages(page_ids) {
    return this._delete('/pages/', {'pages': page_ids});
  }

  async deleteDocument(document_id) {
    if (!document_id) {
      console.warn(`deleteDocument: document_id is empty`);
      return;
    }
    return this._delete(`/documents/${document_id}/`);
  }

  async mergeDocument({src, dst}) {
    if (!src) {
      console.warn(`mergeDocument: src is empty`);
      return;
    }
    if (!dst) {
      console.warn(`mergeDocument: dst is empty`);
      return;
    }
    return this._post(
      '/documents/merge/', {src, dst}
    );
  }

  async rotatePages({page_ids, angle}) {
    let pages = [];

    pages = page_ids.map(page_id => {
      return {id: page_id, angle: angle};
    });
    return this._post('/pages/rotate/', {'pages': pages});
  }

  async reorderPagesApply({old_items, new_items}) {
    let order_data = [];

    old_items.forEach((item, old_index) => {
      let new_index;

      new_index = new_items.findIndex(it => get_id(it) == get_id(item));
      order_data.push({
        id: get_id(item),
        old_number: old_index + 1,
        new_number: new_index + 1
      })
    });

    return this._post('/pages/reorder/', {'pages': order_data});
  }

  async moveToDocument({dst, page_ids, position, merge}) {
    return this._post('/pages/move-to-document/', {
      dst: dst.id,
      pages: page_ids,
      position: position,
      merge: merge
    });
  }

  async moveToFolder({dst, page_ids, single_page, title_format}) {

    return this._post('/pages/move-to-folder/', {
      dst: dst.id,
      pages: page_ids,
      single_page: single_page,
      title_format: title_format
    });
  }

  async changeUserPassword({user_id, password}) {
    /* Change password of the user

    `user_id` may be different user than currently logged one.
    After new user is added, this method is used to change his/her
    password in next step.
    */

    return this._post(`/users/${user_id}/change-password/`, {
      password: password
    });
  }


  async downloadDocumentVersion(document_version) {
    /**
    *  `document_version` contains following attributes:
    *    id
    *    number
    *    file_name
    *    lang
    *    pages
    *    size
    *    page_count
    *    short_description
    *
    *  attributes which correspond to server side (or client side) DocumentVersion model
    */
    let response, blob;

    response = await this._get(`/document-versions/${document_version.id}/download/`);

    blob = await response.blob();

    insert_blob(
      document_version.file_name,
      blob
    );
  }

  async downloadNodes(selected_nodes) {
    let params_arr,
      params_str,
      response,
      blob,
      file_name;

    params_arr = selected_nodes.map(node => `node_ids=${node.id}`);
    params_str = params_arr.join('&');

    response = await this._get('/nodes/download/', params_str);

    file_name = extract_file_name(response, 'fallback.zip');
    blob = await response.blob();

    insert_blob(file_name, blob);
  }

  async nodesMove(data) {
    return this._post('/nodes/move/', data);
  }

  async updateTagsOnNode({tags, node}) {
    return this._post(
      `/nodes/${node.id}/tags/`,
      {tags: tags}
    );
  }

  async search({text, tags}) {
    if (text && tags) {
      return this._get('/search/', `q=${text}&tags=${tags}`);
    }

    if (text) {
      return this._get('/search/', `q=${text}`);
    }

    return this._get('/search/', `tags=${tags}`);
  }

  async preferences({section_name}={}) {
    let params = {};

    if (section_name) {
      params = {'section': section_name};
    }

    return this._get(
      '/preferences/',
      new URLSearchParams(params).toString()
    );
  }

  async preferencesUpdate(data) {
    let url,
      headers_copy = {},
      response,
      that = this;

    url = `${base_url()}/preferences/bulk/`;

    Object.assign(headers_copy, this.headers);  // create a copy of `this.headers`
    headers_copy['Content-Type'] = 'application/json';

    response = fetch(url, {
      method: 'POST',
      headers: headers_copy,
      body: JSON.stringify(data)
    });

    response.then(response => response.json()).then(
      list_of_attrs => {
        list_of_attrs.data.map(item => {
          that.store.push({data: {
            id: item.id,
            type: "preferences",
            attributes: {
              name: item.name,
              value: item.value,
              section: item.section,
              identifier: item.identifier
            }
          }});
        });
    });
  }

  async getInboxCount() {
    return this._get('/nodes/inboxcount/').then(
      response => response.json()
    ).then( data => {
      return data.data.count;
    });
  }

  async _post(url, data) {
    return this._generic({
      method: 'POST',
      url: url,
      data: data,
      content_type: 'application/json'
    });
  }

  async _patch(url, data) {
    return this._generic({
      method: 'PATCH',
      url: url,
      data: data,
      content_type: 'application/json'
    });
  }

  async _delete(url, data) {
    return this._generic({
      method: 'DELETE',
      url: url,
      data: data,
      content_type: 'application/json'
    });
  }

  async _generic({method, url, data, content_type}) {
    let url_with_base,
      body_data = '',
      headers_copy = {};

    url_with_base = `${base_url()}${url}`;

    Object.assign(headers_copy, this.headers);
    headers_copy['Content-Type'] = content_type;

    if (data) {
      body_data = JSON.stringify(data);
    }

    return fetch(url_with_base, {
      method: method,
      headers: headers_copy,
      body: body_data,
    });
  }

  async _get(url, params_str) {
    let url_with_base,
      headers_copy = {};

    if (params_str) {
     url_with_base = `${base_url()}${url}?${params_str}`;
    } else {
      url_with_base = `${base_url()}${url}`;
    }
    Object.assign(headers_copy, this.headers);

    return fetch(url_with_base, {
      method: 'GET',
      headers: headers_copy,
    });
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
