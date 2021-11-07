import { inject as service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';


export default class SessionService extends BaseSessionService {
  @service currentUser;

  async handleAuthentication() {
    super.handleAuthentication("authenticated.index");
    try {
      await this.currentUser.loadCurrentUser();
    } catch (err) {
      await this.invalidate();
    }
  }
}
