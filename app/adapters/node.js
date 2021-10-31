import ApplicationAdapter from './application';

export default class NodeAdapter extends ApplicationAdapter {
  findNode(node_id) {
    let url, ret;

    url = this.buildURL('nodes', node_id);
    ret = this.ajax(url, 'GET');

    return ret;
  }
}
