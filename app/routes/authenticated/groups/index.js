import BaseRoute from 'papermerge/routes/base';
import { service } from '@ember/service';


export default class GroupsRoute extends BaseRoute {
  @service store;

  async model() {
    return this.store.findAll('group');
  }
}
