import { service } from '@ember/service';
import BaseRoute from 'papermerge/base/routing';


export default class TokensRoute extends BaseRoute {
  @service store;

  async model() {
    return this.store.findAll('token');
  }
}
