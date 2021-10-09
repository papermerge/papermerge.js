import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


class PermissionComponent extends Component {
  @service store;

  @action
  onChange(permission, event) {
    let checked = event.target.checked;
    this.args.onChange(permission, checked);
  }
}

export default PermissionComponent;
