import { service } from '@ember/service';
import RSVP from 'rsvp';
import BaseRoute from 'papermerge/routes/base';


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
