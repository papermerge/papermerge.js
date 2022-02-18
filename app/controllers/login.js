import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { base_url } from 'papermerge/utils/host';


export default class LoginController extends Controller {
  @tracked errorMessage;
  @tracked in_progress = false;
  @service session;
  @service router;

  @action
  async authenticate(username, password) {
    try {
      this.in_progress = true;
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
    } finally {
      this.in_progress = false;
    }

    if (this.session.isAuthenticated) {
      // What to do with all this success?
      this.router.transitionTo('authenticated.index');
    }
  }

  get inProgress() {
    return this.in_progress;
  }
}
