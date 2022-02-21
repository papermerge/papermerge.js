import { service } from '@ember/service';
import RSVP from 'rsvp';
import BaseRoute from 'papermerge/routes/base';


export default class EditRoleRoute extends BaseRoute {
  @service store;

  async model(params) {
    return RSVP.hash({
      role: this.store.findRecord('role', params.role_id, {
        include: 'permissions',
      }),
      all_permissions: this.store.findAll('permission'),
    });
  }
}
