import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class CurrentUserService extends Service {
  @service session;
  @service store;

  async loadCurrentUser() {
    if (this.session.isAuthenticated) {
      let user = await this.store.queryRecord('user', { me: true });
      this.set('user', user);
    }
  }
}
