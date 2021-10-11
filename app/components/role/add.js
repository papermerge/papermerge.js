import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

class AddRoleComponent extends Component {
  @service store;
  @service router;

  @tracked name = '';
  permissions = A([]);

  @action
  onChange(permission, checked) {
    permission.isChecked = checked;
  }

  @action
  onSubmit() {
    console.log(this.name);
    console.log(this.permissions);
    /*
    let role;

    role = {
      name: this.name
    };

    this.store.createRecord(
      'role',
      role
    ).save();

    this.router.transitionTo('roles');
    */
  }
}

export default AddRoleComponent;
