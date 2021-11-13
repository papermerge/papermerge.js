import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class DocumentRoute extends Route {
  @service store;

  async model(params) {
    let adapter;

    adapter = this.store.adapterFor('document');
    return adapter.getDocumentVersion(params.document_id);
  }

  renderTemplate() {
    this.render('authenticated.document_version');
  }
}
