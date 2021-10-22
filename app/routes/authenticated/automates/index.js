import { inject as service } from '@ember/service';
import BaseRoute from 'papermerge/base/routing';


export default class AutomatesRoute extends BaseRoute {
  @service store;

  async model() {
    return this.store.findAll('automate');
  }
}