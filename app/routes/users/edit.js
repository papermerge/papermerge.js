import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';


class EditUserRoute extends Route {
  @service store;

  async model(params) {
    return RSVP.hash({
      user: this.store.findRecord('user', params.user_id),
      roles: this.store.findAll('role'),
      groups: this.store.findAll('group')
    });
  }
}

export default EditUserRoute;
