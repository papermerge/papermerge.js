import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class BaseRoute extends Route {
  @service session;
  @service store;
  @service currentUser;

  async beforeModel(transition) {
    await this.session.setup();
    await this.currentUser.loadCurrentUser();
    this.session.requireAuthentication(transition, 'login');
  }
}
