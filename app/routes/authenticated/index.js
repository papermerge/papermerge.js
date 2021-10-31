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
      return adapter.findNode(this.home_folder_id);
    }

    return adapter.findNode(params.node_id);
  }

  get home_folder_id() {
    /*
    Another way to get home folder would be:

      this.currentUser.user.get('home_folder').get('id')

    However, last call will issue following background http API call:

      GET /api/folders/<folder_id>/.

    The workaround/the trick to avoid this background call, is to
    convert user to json object, and then just get `home_folder` attribute
    which is just an id.
    */
    let user_json = this.currentUser.user.toJSON();
    return user_json['home_folder'];
  }
}
