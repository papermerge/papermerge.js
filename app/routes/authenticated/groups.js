import { inject as service } from '@ember/service';
import BaseRoute from 'papermerge/routes/base';


export default class GroupsRoute extends BaseRoute {
  @service store;

  async model() {
    return this.store.findAll('group');
  }
}
