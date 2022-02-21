import { service } from '@ember/service';
import BaseRoute from 'papermerge/routes/base';


export default class ChangeUserPasswordRoute extends BaseRoute {
  @service store;

  async model(params) {
    return this.store.findRecord('user', params.user_id);
  }
}
