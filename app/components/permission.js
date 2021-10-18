import Component from '@glimmer/component';


class PermissionComponent extends Component {

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
