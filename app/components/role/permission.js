import Component from '@glimmer/component';


class PermissionComponent extends Component {
  get isChecked() {
    /*
    A permission is checked only if given current permission
    is part of current role model available via `this.args.role`.
    */
    let role_perm_ids;

    role_perm_ids = this.args.role.permissions.map((p) => p.id);

    return role_perm_ids.includes(this.args.permission.id);
  }

  set isChecked(value) {
    /*
    Just forwards the event to parent component, which will take care of
    adding/removing permission.
    */
    this.args.onChange(value, this.args.role, this.args.permission);
  }
}

export default PermissionComponent;
