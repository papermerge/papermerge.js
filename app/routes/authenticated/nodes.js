import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";
import RSVP from 'rsvp';


export default class FolderRoute extends Route {
  @service store;

  queryParams = {
    extranode_id: {
      refreshModel: true
    }
  };

  model(params) {
    let response, adapter;

    adapter = this.store.adapterFor('node');

    if (params.extranode_id) {
      return RSVP.hash({
        node: adapter.findNode(params.node_id),
        extranode: adapter.findNode(params.extranode_id)
      });
    }

    return adapter.findNode(params.node_id);
  }

  setupController(controller, model) {
    let _controller = this.controllerFor('authenticated.nodes');

    if (model.extranode) {
      _controller.set('dualpanel_mode', true);
      _controller.set('mainnode', model.node);
      _controller.set('extranode', model.extranode);
    } else {
      _controller.set('dualpanel_mode', false);
      _controller.set('mainnode', model);
    }
  }
}
