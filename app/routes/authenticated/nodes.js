import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';


export default class FolderRoute extends Route {
  @service store;
  @service currentUser;

  queryParams = {
    extranode_id: {
      refreshModel: true
    }
  };

  async model(params) {
    let adapter;

    adapter = this.store.adapterFor('node');
    await this.currentUser.loadCurrentUser();

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
    } else {
      _controller.set('dualpanel_mode', false);
      _controller.set('extranode', undefined);
    }

    _controller.set('mainnode', model.node);
    _auth_controller.set('home_folder', model.home_folder);
  }
}
