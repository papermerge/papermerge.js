import ApplicationAdapter from './application';
import { service } from '@ember/service';
import ENV from 'papermerge/config/environment';


export default class NodeAdapter extends ApplicationAdapter {

  @service store;

  async getChildren({node_id, page, cache}) {
    let url,
      promise;

    url = this.buildURL('nodes', node_id);

    if (page) {
      url = `${url}?page[number]=${page}`
    }

    promise = fetch(url, {
      method: 'GET',
      headers: this.headers,
      cache: cache || ENV.APP.FETCH_CACHE
    }).then(
      response => response.json()
    ).then((nodes) => {
        let folders,
          docs,
          node_ids;

        node_ids = nodes.data.map(node => {
          let normalized_node;

          if (node.type === "folders") {
            normalized_node = this.store.normalize('folder', node);
          } else if (node.type === "documents") {
            normalized_node = this.store.normalize('document', node);
          }

          this.store.push(normalized_node);

          return node.id;
        });

        folders = this.store.peekAll('folder').filter(
          folder => node_ids.includes(folder.id)
        );
        docs = this.store.peekAll('document').filter(
          doc => node_ids.includes(doc.id)
        );

        return {
          children: folders.concat(docs),
          meta: nodes.meta
        };
    });

    return promise;
  }

  async getFolder(node_id) {
    let record;

    record = this.store.peekRecord('folder', node_id);
    if (record) {
      return record;
    }

    return this.store.findRecord('folder', node_id);
  }
}
