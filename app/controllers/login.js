import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;
  @service router;

  @action
  async authenticate(username, password) {
    try {
      await this.session.authenticate(
        'authenticator:auth-token',
        username,
        password
      );
    } catch (error) {
      this.errorMessage = "Invalid credentials";
    }

    if (this.session.isAuthenticated) {
      // What to do with all this success?
      this.router.transitionTo('authenticated.index');
    }
  }
}
