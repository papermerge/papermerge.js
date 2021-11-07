import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;

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
      this.transitionToRoute('authenticated.index');
    }
  }
}
