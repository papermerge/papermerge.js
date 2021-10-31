import Component from '@glimmer/component';
import { action } from '@ember/object';

class PermissionGroupComponent extends Component {
  /*
  A permission group is a set of four permissions
  corresponding to specific model (add/change/delete/view).

  When user checks/unchecks specific permission, that
  permission is immediately added/removed from current role.

  `this.args.role` - current role model.
  `this.args.perm_group.perms` - permissions in the group
  `this.args.perm_group.model` - model name (e.g. User, Automate)
  */

  get isChecked() {
    /*
    `isChecked` is true when all (four) permissions in the
    group are (visually) checked.

    When a specific permission is checked/unchecked it is
    added/removed from `this.args.role.permissions`. Thus,
    in order to say if all group was checked (i.e. selected)
    it is sufficient to see if all group permissions i.e (
    `this.args.perm_group.perms`) are included in
    `this.args.role.permissions`.
    */
    let role_perm_ids, group_perm_ids;

    role_perm_ids = this.args.role.permissions.map((p) => p.id);
    group_perm_ids = this.args.perm_group.perms.map((p) => p.id);

    return group_perm_ids.every((v) => role_perm_ids.includes(v));
  }

  set isChecked(value) {
    // pass
  }

  @action
  onChange(value, role, perm) {
    /*
    This function is triggered from Role::Permission component.

    `value` is set to `true` (or `false`) depending
    if user checked/uncheked given permission referenced by `perm`.
    `role` is component's current role (which is actually available
    as `this.args.role`).
    */
    if (!value) {
      this.removePermission(role, perm);
      this.check_all = false;
    } else {
      this.addPermission(role, perm);
    }
  }

  @action
  onChangeGroupPermissions(event) {
    /*
    Check/uncheck all permissions which are part
    of the group.
    */
    let value = event.target.checked,
      role = this.args.role,
      that = this;

    if (value) {
      // user chose to select (he checked) all
      // permissions in the group
      this.args.perm_group.perms.forEach((perm) => {
        that.addPermission(role, perm);
      });
    } else {
      // user chose to unselect (i.e. he unchecked) all
      // permissions in the group
      this.args.perm_group.perms.forEach((perm) => {
        that.removePermission(role, perm);
      });
    }
  }

  addPermission(role, perm) {
    role.permissions.addObject(perm);
  }

  removePermission(role, perm) {
    role.permissions.removeObject(perm);
  }
}

export default PermissionGroupComponent;
