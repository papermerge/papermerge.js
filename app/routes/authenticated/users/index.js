import { inject as service } from '@ember/service';
import BaseRoute from 'papermerge/base/routing';


export default class UsersRoute extends BaseRoute {
  @service store;

  async model() {
    return this.store.findAll('user');
  }
}

