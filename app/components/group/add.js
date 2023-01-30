import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { group_perms_by_model } from 'papermerge/utils';
import { TrackedArray } from 'tracked-built-ins';


class AddGroupComponent extends Component {
  @service store;
  @service router;

  @tracked name = '';
  @tracked new_group_perms = new TrackedArray();

  get permission_groups() {
    return group_perms_by_model(this.args.all_permissions);
  }

  get disabled() {
    return !this.name;
  }

  @action
  onSubmit() {
    this.new_group = this.store.createRecord('group');
    this.new_group_perms.forEach(item => this.new_group.permissions.addObject(item));
    this.new_group.name = this.name;
    this.new_group.save();


    this.router.transitionTo('authenticated.groups');
  }

  @action
  onCancel() {
    this.new_group.unloadRecord();
    this.router.transitionTo('authenticated.groups');
  }
}

export default AddGroupComponent;
