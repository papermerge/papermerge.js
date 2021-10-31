import { inject as service } from '@ember/service';
import BaseRoute from 'papermerge/base/routing';

export default class ChangeUserPasswordRoute extends BaseRoute {
  @service store;

  async model(params) {
    return this.store.findRecord('user', params.user_id);
  }
}
