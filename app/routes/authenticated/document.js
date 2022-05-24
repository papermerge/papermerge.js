import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { setupDualController } from './utils';


export default class DocumentRoute extends Route {
  @service store;
  @service requests;

  async model(params) {
    let //doc_adapter,
      doc,
      last_version,
      pages_with_url;

    doc = await this.store.findRecord(
      'document',
      params.document_id,
      { reload: true }
    );

    last_version = doc.last_version;

    pages_with_url = last_version.pages.map(
      (page) => this.requests.loadImage.perform(page, 'image/svg+xml')
    );

    return {
      'doc': doc,
      'document_versions': doc.versions,
      'last_document_version': last_version,
      'pages': pages_with_url
    };
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
