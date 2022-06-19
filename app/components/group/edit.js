import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { group_perms_by_model } from 'papermerge/utils';


class EditGroupComponent extends Component {
  @service router;

  get permission_groups() {
    return group_perms_by_model(this.args.all_permissions);
  }

  @action
  onSubmit() {
    let group = this.args.group;

    group.save();
    this.router.transitionTo('authenticated.groups');
  }
}

export default EditGroupComponent;
