import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class TagsRoute extends Route {
  @service store;

  async model(params) {
    let ret = this.store.findRecord('tag', params.tag_id);
    console.log(ret);
    return ret;
  }
}
