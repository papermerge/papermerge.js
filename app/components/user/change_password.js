import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


class ChangeUserPasswordComponent extends Component {
  @service router;

  @tracked new_password_1;
  @tracked new_password_2;

  @action
  onSubmit() {
    let user = this.args.user;

    user.save();
    this.router.transitionTo('users');
  }
}

export default ChangeUserPasswordComponent;
