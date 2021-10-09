import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


class AddRoleRoute extends Route {
  @service store;

  async model() {
    return this.store.findAll('permission');
  }
}

export default AddRoleRoute;
