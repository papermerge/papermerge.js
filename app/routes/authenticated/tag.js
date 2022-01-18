import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class TagRoute extends Route {
  @service store;

  async model(params) {
    return this.store.findRecord('tag', params.tag_id);
  }
}
