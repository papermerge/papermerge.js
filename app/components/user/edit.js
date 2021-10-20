import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { group_perms_by_model } from 'papermerge/utils';


class EditUserComponent extends Component {
  @service router;

  @action
  onSubmit() {
    let user = this.args.user;

    user.save();
    this.router.transitionTo('users');
  }
}

export default EditUserComponent;
