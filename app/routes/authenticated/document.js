import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';


export default class DocumentRoute extends Route {
  @service store;

  queryParams = {
    extranode_id: {
      refreshModel: true
    }
  };

  async model(params) {
    let doc_adapter,
      page_adapter,
      node_adapter,
      extranode,
      document_version,
      pages,
      pages_with_url;

    node_adapter = this.store.adapterFor('node');
    page_adapter = this.store.adapterFor('page');
    doc_adapter = this.store.adapterFor('document');

    document_version  = await doc_adapter.getDocumentVersion(params.document_id);
    pages = await document_version.pages;
    pages_with_url = await page_adapter.loadBinaryImages(pages);

    if (params.extranode_id) {

      extranode = await node_adapter.findNode(params.extranode_id)

      return {
        'document_version': document_version,
        'pages': pages_with_url,
        'extranode': extranode
      };
    }

    return {
      'document_version': document_version,
      'pages': pages_with_url
    }
  }

  renderTemplate() {
    this.render('authenticated.viewer');
  }

  setupController(controller, model) {
    let _controller = this.controllerFor('authenticated.document'),
      _auth_controller = this.controllerFor('authenticated');

    if (model.extranode) {
      console.log("Document controller setting dualpanel_mode to true");
      _controller.set('dualpanel_mode', true);
      _controller.set('extranode', model.extranode);
    } else {
      _controller.set('dualpanel_mode', false);
      _controller.set('extranode', undefined);
    }

    _controller.set('document_version', model.document_version);
    _controller.set('pages', model.pages);
  }
}
