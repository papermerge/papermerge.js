import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

class AddUserComponent extends Component {
  /*
  Form component to add new user.
  */

  @service store;
  @service router;

  @tracked username;
  @tracked email;
  @tracked first_name;
  @tracked last_name;
  @tracked is_superuser;
  @tracked is_staff;
  @tracked is_active;

  constructor(owner, args) {
    super(owner, args);

    this.new_user = this.store.createRecord('user');
  }

  get disabled() {
    /*
    Form can be submitted only when both
    mandatory fields username and email were provided.
    */
    return !this.username || !this.email;
  }

  @action
  onSubmit() {
    if (this.new_user && this.username && this.email) {
      this.new_user.username = this.username;
      this.new_user.email = this.email;
      this.new_user.first_name = this.first_name;
      this.new_user.last_name = this.last_name;
      this.new_user.is_active = this.is_active;
      this.new_user.is_superuser = this.is_superuser;
      this.new_user.is_staff = this.is_staff;
      this.new_user.save();
    }

    this.router.transitionTo('authenticated.users');
  }
}

export default AddUserComponent;
