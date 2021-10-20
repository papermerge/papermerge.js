import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

class UsersRoute extends Route {
  @service store;

  async model() {
    return this.store.findAll('user');
  }
}

export default UsersRoute;
