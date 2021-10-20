import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


class ChangeUserPasswordRoute extends Route {
  @service store;

  async model(params) {
    return this.store.findRecord('user', params.user_id);
  }
}

export default ChangeUserPasswordRoute;
