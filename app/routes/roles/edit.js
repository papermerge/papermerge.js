import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

class EditRoleRoute extends Route {
  @service store;

  async model(model_id) {
    return this.store.peekRecord('permission', model_id);
  }
}

export default EditRoleRoute;
