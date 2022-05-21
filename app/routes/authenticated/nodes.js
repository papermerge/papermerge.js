import BaseRoute from 'papermerge/routes/base';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { action } from '@ember/object';
import { TrackedObject } from 'tracked-built-ins';
import { getPanelInfo } from './utils';


export default class NodesRoute extends BaseRoute {
  @service store;
  @service currentUser;

  queryParams = {
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
        extra_last_version.pages,
        'image/svg+xml'
      );
      context['extra'] = {
        'doc': extra_doc,
        'document_versions': extra_doc.versions,
        'last_document_version': extra_last_version,
        'pages': extra_pages_with_url,
      }

      return context;
    }

    return context;
  }

  @action
  loading(transition, originRoute) {
    let nodes_controller, document_controller, node_id;

    nodes_controller = this.controllerFor('authenticated.nodes');
    document_controller = this.controllerFor('authenticated.document');
    node_id = originRoute.paramsFor('authenticated.nodes').node_id;

    // In commander will show rotating spinner
    // when user clicked on breadcrumb item
    nodes_controller.set(
      'currently_loading_state',
      {
        'node_id': node_id,
        'hint': 'left'
      }
    );
    // In document viewer will show rotating spinner when
    // user clicked on breadcrumb item
    document_controller.set(
      'currently_loading_state',
      {
        'node_id': node_id,
        'hint': 'left'
      }
    );

    transition.promise.finally(function() {
        nodes_controller.set(
          'currently_loading_state',
          {
            'node_id': undefined,
            'hint': undefined
          }
        );
        document_controller.set(
          'currently_loading_state',
          {
            'node_id': undefined,
            'hint': undefined
          }
        );
    });

    return false; // allows the loading template to be shown
  }
}
