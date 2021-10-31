import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import BaseRoute from 'papermerge/base/routing';

class AddUserRoute extends BaseRoute {
  @service store;

  async model() {
    return RSVP.hash({
      groups: this.store.findAll('group'),
      roles: this.store.findAll('role'),
    });
  }
}

export default AddUserRoute;
