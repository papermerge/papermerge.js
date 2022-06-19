import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { group_perms_by_model } from 'papermerge/utils';


class AddGroupComponent extends Component {
  @service store;
  @service router;

  @tracked name = '';

  get group() {
    if (!this.new_group) {
      this.new_group = this.store.createRecord('group');
    }

    return this.new_group;
  }

  get permission_groups() {
    return group_perms_by_model(this.args.all_permissions);
  }

  get disabled() {
    return !this.name;
  }

  @action
  onSubmit() {
    if (this.new_group && this.name) {
      this.new_group.name = this.name;
      this.new_group.save();
    }

    this.router.transitionTo('authenticated.groups');
  }

  @action
  onCancel() {
    this.new_group.unloadRecord();
    this.router.transitionTo('authenticated.groups');
  }
}

export default AddGroupComponent;
