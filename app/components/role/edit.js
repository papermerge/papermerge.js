import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


class EditRoleComponent extends Component {
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

    this.router.transitionTo('roles');
  }
}

export default EditRoleComponent;
