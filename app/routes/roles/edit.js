import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';


class EditRoleRoute extends Route {
  @service store;

  async model(params) {
    return RSVP.hash({
      role: this.store.findRecord(
        'role',
        params.role_id,
        { include: 'permissions' }
      ),
      all_permissions: this.store.findAll('permission')
    });
  }
}

export default EditRoleRoute;
