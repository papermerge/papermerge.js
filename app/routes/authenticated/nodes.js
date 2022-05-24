import BaseRoute from 'papermerge/routes/base';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { getPanelInfo, setupDualController } from './utils';



export default class NodesRoute extends BaseRoute {
  @service store;
  @service currentUser;
  @service requests;

  queryParams = {
    page: {
      refreshModel: true
    }
  };

  async model(params) {
    let page_adapter,
      context = {};

    page_adapter = this.store.adapterFor('page');
    await this.currentUser.loadCurrentUser();

    context = await getPanelInfo({
      store: this.store,
      node_id: params.node_id,
      page: params.page
    });

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

  setupController(controller, model) {
    super.setupController(controller, model);

    setupDualController({
      controller: controller,
      store: this.store,
      requests: this.requests
    });
  }
}
