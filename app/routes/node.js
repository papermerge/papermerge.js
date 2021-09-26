import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class FolderRoute extends Route {
  @service store;

  async model(params) {
    return this.store.findRecord('node', params.node_id, {include: "children"});
  }
}
