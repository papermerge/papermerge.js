import { service } from '@ember/service';
import BaseRoute from 'papermerge/routes/base';


export default class UsersRoute extends BaseRoute {
  @service store;

  async model() {
    return this.store.findAll('user');
  }
}
