import ApplicationAdapter from './application';


export default class NodeAdapter extends ApplicationAdapter {

  findNode(node_id) {
    let url, ret;

    url = this.buildURL('nodes', node_id);

    return this.ajax(url, 'GET', {data: {include: 'children'}}).then((node) => {
      this.store.pushPayload('folder', node);
      ret = this.store.peekRecord('folder', node.data.id);
      return ret;
    });
  }
}
