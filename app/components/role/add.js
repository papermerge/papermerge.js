import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { group_perms_by_model } from 'papermerge/utils';


class AddRoleComponent extends Component {
  @service store;
  @service router;

  @tracked name = '';

  get role() {
    if (!this.new_role) {
      this.new_role = this.store.createRecord('role');
    }

    return this.new_role;
  }

  get permission_groups() {
    return group_perms_by_model(this.args.all_permissions);
  }

  get disabled() {
    return !this.name;
  }

  @action
  onSubmit() {
    if (this.new_role && this.name) {
      this.new_role.name = this.name;
      this.new_role.save();
    }

    this.router.transitionTo('roles');
  }

  @action
  onCancel() {
    this.new_role.unloadRecord();
    this.router.transitionTo('roles');
  }
}

export default AddRoleComponent;
