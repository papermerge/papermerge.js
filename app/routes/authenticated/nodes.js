import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

import { getPanelInfo } from './utils';


export default class FolderRoute extends Route {
  @service store;
  @service currentUser;

  queryParams = {
    extranode_id: {
      refreshModel: true
    },
    extradoc_id: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  };

  async model(params) {
    let adapter,
      doc_adapter,
      page_adapter,
      pages,
      pages_with_url,
      document_version,
      context = {};

    adapter = this.store.adapterFor('node');
    page_adapter = this.store.adapterFor('page');
    doc_adapter = this.store.adapterFor('document');

    await this.currentUser.loadCurrentUser();

    context = await getPanelInfo({
      store: this.store,
      node_id: params.node_id,
      page: params.page
    });


    if (params.extradoc_id) {
      document_version  = await doc_adapter.getDocumentVersion(params.extradoc_id);
      pages = await document_version.pages;
      pages_with_url = await page_adapter.loadBinaryImages(pages);
      this.dualpanel_mode = true;

      return RSVP.hash({
        node: adapter.findNode(params.node_id),
        home_folder: this.currentUser.user.home_folder,
        pages: pages_with_url,
        document_version: document_version
      });
    }

    if (params.extranode_id) {
      context['extranode'] = await getPanelInfo({
        store: this.store,
        node_id: params.extranode_id,
        page: 1
      });
      this.dualpanel_mode = true;
    }

    context['home_folder'] = await this.currentUser.user.getHomeFolder();

    return context;
  }

  setupController(controller, model) {

    let _controller = this.controllerFor('authenticated.nodes'),
      _auth_controller = this.controllerFor('authenticated');

    if (model.extranode) {
      _controller.set('extranode', model.extranode);
    } else if (model.document_version) {
      _controller.set('document_version', model.document_version);
      _controller.set('pages', model.pages);
      _controller.set('extranode', model.document_version.document);
    } else {
      _controller.set('extranode', undefined);
    }
    _controller.set('mainnode', model.current_node);
    _auth_controller.set('home_folder', model.home_folder);
    _controller.set('children', model.children);
    _controller.set('pagination', model.pagination);
  }

}
