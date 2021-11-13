import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class DocumentRoute extends Route {
  @service store;

  async model(params) {
    let doc_adapter,
      page_adapter,
      document_version,
      pages,
      pages_with_url;

    page_adapter = this.store.adapterFor('page');
    doc_adapter = this.store.adapterFor('document');

    document_version  = await doc_adapter.getDocumentVersion(params.document_id);
    pages = await document_version.pages;
    pages_with_url = await page_adapter.loadBinaryImages(pages);

    return {
      'document_version': document_version,
      'pages': pages_with_url
    }
  }

  renderTemplate() {
    this.render('authenticated.document_version');
  }
}
