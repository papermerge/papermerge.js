import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


class AddRoleComponent extends Component {
  @service store;
  @service router;

  @tracked dst_folder;
  @tracked name;
  @tracked match;
  @tracked is_case_sensitive = false;
  @tracked matching_alg;

  @action
  onSubmit() {
    let role;

    role = {
      name: this.name
    };

    this.store.createRecord(
      'role',
      role
    ).save();

    this.router.transitionTo('roles');
  }
}

export default AddRoleComponent;
