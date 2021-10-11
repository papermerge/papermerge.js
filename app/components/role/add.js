import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


class AddRoleComponent extends Component {
  @service store;
  @service router;

  @tracked name = '';
  chosen_permissions = [];

  @action
  onChange(permission, checked) {
    if (checked) {
      this.chosen_permissions.push(permission);
    } else {
      this.chosen_permissions = this.chosen_permissions.filter(
        item => item.id != permission.id
      );
    }
  }

  @action
  onSubmit() {
    let role;

    role = {
      name: this.name,
      permissions: this.chosen_permissions
    };

    this.store.createRecord(
      'role',
      role
    ).save();

    this.router.transitionTo('roles');
  }
}

export default AddRoleComponent;
