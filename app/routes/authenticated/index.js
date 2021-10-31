import { inject as service } from '@ember/service';
import BaseRoute from 'papermerge/base/routing';


export default class IndexRoute extends BaseRoute {
  @service store;
  @service currentUser;

  async model(params) {
    let adapter, ret;

    adapter = this.store.adapterFor('node');

    if (!params.node_id) {
      // when node_id is not provided, use as default
      // user's home folder ID.
      return this.currentUser.user.home_folder.then((home_folder) => {
        return adapter.findNode(home_folder.id);
      });
    }

    return adapter.findNode(params.node_id);
  }
}
