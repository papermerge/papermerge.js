import ApplicationAdapter from './application';


export default class NodeAdapter extends ApplicationAdapter {

  getDocumentVersion(document_id) {
    let url, ret;

    url = this.buildURL('documents', document_id);

    return this.ajax(url, 'GET').then((document_version) => {
      this.store.pushPayload('document-version', document_version);
      ret = this.store.peekRecord('document-version', document_version.data.id);
      return ret;
    });
  }
}
