import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import { getPanelInfo } from './utils';


export default class FolderRoute extends Route {
  @service store;
  @service currentUser;

  queryParams = {
    extra_id: {
      refreshModel: true
    },
    extra_type: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  };

  async model(params) {
    let page_adapter,
      extra_doc,
      extra_last_version,
      extra_pages_with_url,
      context = {};

    page_adapter = this.store.adapterFor('page');
    await this.currentUser.loadCurrentUser();

    context = await getPanelInfo({
      store: this.store,
      node_id: params.node_id,
      page: params.page
    });

    if (params.extra_id && params.extra_type === 'doc') {
      extra_doc  = await this.store.findRecord(
        'document',
        params.extra_id,
        { reload: true }
      );
      extra_last_version = extra_doc.last_version
      extra_pages_with_url = await page_adapter.loadImages(
        extra_last_version.pages
      );
      context['extra'] = {
        'doc': extra_doc,
        'document_versions': extra_doc.versions,
        'last_document_version': extra_last_version,
        'pages': extra_pages_with_url,
      }
      context['home_folder'] = this.currentUser.user.home_folder;
      return context;
    }

    if (params.extra_id && params.extra_type === 'folder') {
      context['extra'] = await getPanelInfo({
        store: this.store,
        node_id: params.extra_id,
        page: 1
      });
      this.dualpanel_mode = true;
    }

    context['home_folder'] = await this.currentUser.user.getHomeFolder();

    return context;
  }

  setupController(controller, model) {

    let _auth_controller = this.controllerFor('authenticated');

    _auth_controller.set('home_folder', model.home_folder);
  }

}
