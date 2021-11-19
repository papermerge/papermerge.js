import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';


export default class NodeAdapter extends ApplicationAdapter {

  @service store;

  async getChildren(node_id) {
    let url, nodes, folders, docs;

    url = this.buildURL('nodes', node_id);

    nodes = await fetch(url, {
      method: 'GET',
      headers: this.headers
    }).then(response => response.json());

    nodes.data.map(node => {
      let normalized_node = this.store.normalize('node', node);
      this.store.push(normalized_node);
    });

    folders = this.store.peekAll('folder').filter(folder => folder.parent.get('id') == node_id);
    docs = this.store.peekAll('document').filter(folder => folder.parent.get('id') == node_id);

    return folders.concat(docs);
  }
}
