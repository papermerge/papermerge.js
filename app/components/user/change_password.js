import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

class ChangeUserPasswordComponent extends Component {
  @service router;

  @tracked new_password_1;
  @tracked new_password_2;

  get disabled() {
    /**
     * If both password inputs are empty submit button is disabled.
     * Also, submit form button will be disabled if given
     * passwords do not match.
     */
    if (this.new_password_1 && new_password_2) {
      if (this.new_password_1 === this.new_password_2) {
        return false;
      }
    }

    return true;
  }

  @action
  onSubmit() {
    let user = this.args.user;

    user.changePassword(this.new_password_1);
    this.router.transitionTo('authenticated.users');
  }
}

export default ChangeUserPasswordComponent;
