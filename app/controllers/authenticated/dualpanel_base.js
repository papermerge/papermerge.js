import Controller from '@ember/controller';
import { service } from '@ember/service';



export default class DualPanelBaseController extends Controller {

  @service currentUser;

  get dualpanel_mode() {
    return this.extra_id;
  }

  async getPanelInfo({store, node_id, page}) {
    /*
      Returns current_node model its
      children nodes models and associated pagination info.

      `page` is integer number of the page
      `store` is "@service store" thingy
    */
    const adapter = store.adapterFor('node');

    return Promise.all([
      adapter.getChildren({node_id, page}),
      adapter.getFolder(node_id)
    ]);
  }
}
