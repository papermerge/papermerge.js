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

  get isChecked() {
    let role_perm_ids;

    role_perm_ids = this.args.role.permissions.map(p => p.id);

    return role_perm_ids.includes(this.args.permission.id);
  }

  set isChecked(value) {
    if (value) {
      this.args.role.permissions.addObject(this.args.permission);
    } else {
      this.args.role.permissions.removeObject(this.args.permission);
    }
  }
}

export default PermissionComponent;
