import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class BaseRoute extends Route {
  @service session;
  @service currentUser;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
    await this.currentUser.loadCurrentUser();
  }
}
