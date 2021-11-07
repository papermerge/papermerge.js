import BaseRoute from 'papermerge/base/routing';
import { inject as service } from '@ember/service';


export default class RolesRoute extends BaseRoute {
  @service store;

  async model() {
    return this.store.findAll('role');
  }
}
