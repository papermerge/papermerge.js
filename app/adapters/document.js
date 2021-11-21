import ApplicationAdapter from './application';


export default class DocumentAdapter extends ApplicationAdapter {

  async getDocumentVersion(document_id) {
    let url, ret;

    url = this.buildURL('documents', document_id);

    return this.ajax(url, 'GET').then((document_version) => {
      this.store.pushPayload('document-version', document_version);
      ret = this.store.peekRecord('document-version', document_version.data.id);
      return ret;
    });
  }

  uploadFile({doc, file}) {
    let build_url, url, headers;

    headers = this.headers;
    headers['Content-Disposition'] = `attachment; filename=${file.name}`;

    build_url = this.buildURL('documents', doc.id);
    url = `${build_url}upload/${file.name}`;

    return fetch(url, {
      method: 'PUT',
      body: file,
      headers: headers
    });
  }

  urlForCreateRecord() {
    let ret = this.buildURL('nodes');
    return ret;
  }

}
