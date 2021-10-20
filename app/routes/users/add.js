import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';


class AddUserRoute extends Route {
  @service store;

  async model() {
    return RSVP.hash({
      groups: this.store.findAll('group'),
      roles: this.store.findAll('role')
    });
  }
}

export default AddUserRoute;