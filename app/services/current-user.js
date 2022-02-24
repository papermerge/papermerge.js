import Service from '@ember/service';
import { service } from '@ember/service';


export default class CurrentUserService extends Service {
  @service session;
  @service store;

  user = null;

  async loadCurrentUser() {
    let adapter, user;

    if (this.isAuthenticated && this.user) {
      return this.user;
    }

    if (this.session.isAuthenticated) {
      adapter = this.store.adapterFor('user');
      user = await adapter.getCurrentUser();
      this.user = user;
    }

    return this.user;
  }

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }
}
