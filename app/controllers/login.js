import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";


export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;

  @action
  async authenticate(event) {
    event.preventDefault();

    let { identification, password } = this;


    try {
      await this.session.authenticate(
        'authenticator:auth-token',
        identification,
        password
      );
    } catch (error) {
      this.errorMessage = error;
    }

    if (this.session.isAuthenticated) {
      // What to do with all this success?
    }
  }

  @action
  updateIdentification(event) {
    this.identification = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }
}