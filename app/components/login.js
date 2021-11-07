import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class LoginComponent extends Component {
  @tracked username;
  @tracked password;

  get disabled() {
    if (!this.username) {
      return true;
    }

    if (!this.password) {
      return true;
    }

    return false;
  }

  @action
  onSubmit(event) {
    event.preventDefault();
    this.args.onSubmit(this.username, this.password);
  }
}
