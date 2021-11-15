import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';


export default class FolderRoute extends Route {
  @service store;
  @service currentUser;

  queryParams = {
    extranode_id: {
      refreshModel: true
    },
    extradoc_id: {
      refreshModel: true
    }
  };

  async model(params) {
    let adapter,
      doc_adapter,
      page_adapter,
      pages,
      pages_with_url,
      document_version;

    adapter = this.store.adapterFor('node');
    page_adapter = this.store.adapterFor('page');
    doc_adapter = this.store.adapterFor('document');

    await this.currentUser.loadCurrentUser();

    if (params.extradoc_id) {
      document_version  = await doc_adapter.getDocumentVersion(params.extradoc_id);
      pages = await document_version.pages;
      pages_with_url = await page_adapter.loadBinaryImages(pages);

      return RSVP.hash({
        node: adapter.findNode(params.node_id),
        home_folder: this.currentUser.user.home_folder,
        pages: pages_with_url,
        document_version: document_version
      });
    }

    if (params.extranode_id) {
      return RSVP.hash({
        node: adapter.findNode(params.node_id),
        extranode: adapter.findNode(params.extranode_id),
        home_folder: this.currentUser.user.home_folder
      });
    }

    return RSVP.hash({
      node: adapter.findNode(params.node_id),
      home_folder: this.currentUser.user.home_folder
    });
  }

  setupController(controller, model) {
    let _controller = this.controllerFor('authenticated.nodes'),
      _auth_controller = this.controllerFor('authenticated');

    if (model.extranode) {
      _controller.set('dualpanel_mode', true);
      _controller.set('extranode', model.extranode);
    } else if (model.document_version) {
      _controller.set('dualpanel_mode', true);
      _controller.set('document_version', model.document_version);
      _controller.set('pages', model.pages);
      _controller.set('extranode', model.document_version.document);
    } else {
      _controller.set('dualpanel_mode', false);
      _controller.set('extranode', undefined);
    }

    _controller.set('mainnode', model.node);
    _auth_controller.set('home_folder', model.home_folder);
  }
}
