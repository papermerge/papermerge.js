import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { base_url } from 'papermerge/utils';


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
      if (error instanceof TypeError) {
        // TypeError is thrown by fetch API if there is a
        // network issue e.g. backend server is not reachable;
        let extra_message = `Please double check that REST API server '${base_url()}/' is reachable.`
        this.errorMessage = `${error} ${extra_message}`;
      } else {
        this.errorMessage = error;
      }
    }

    if (this.session.isAuthenticated) {
      // What to do with all this success?
      this.router.transitionTo('authenticated.index');
    }
  }
}
