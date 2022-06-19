import { service } from '@ember/service';
import RSVP from 'rsvp';
import BaseRoute from 'papermerge/routes/base';


export default class EditGroupRoute extends BaseRoute {
  @service store;

  async model(params) {
    return RSVP.hash({
      group: this.store.findRecord('group', params.group_id, {
        include: 'permissions',
      }),
      all_permissions: this.store.findAll('permission'),
    });
  }
}
