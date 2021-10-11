import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

class RolesRoute extends Route {
  @service store;

  async model() {
    return this.store.findAll('role');
  }
}

export default RolesRoute;
