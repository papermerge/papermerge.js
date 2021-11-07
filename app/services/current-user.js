import Service from '@ember/service';
import { inject as service } from '@ember/service';


export default class CurrentUserService extends Service {
  @service session;
  @service store;

  user = null;

  async loadCurrentUser() {

    if (this.session.isAuthenticated) {
      let user = await this.store.queryRecord(
        'user', { me: true }
      );
      this.user = user;
    }
  }

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }
}
