import Component from '@glimmer/component';
import { action } from '@ember/object';


class PermissionGroupComponent extends Component {
  /*
  A permission group is a set of four permissions
  corresponding to specific model (add/change/delete/view).

  When user checks/unchecks specific permission, that
  permission is immediately added/removed from current parent_group_model.

  `this.args.parent_group_model` - current parent_group_model model.
  `this.args.perm_group.perms` - permissions in the group
  `this.args.perm_group.model` - model name (e.g. User)
  */


  get isChecked() {
    /*
    `isChecked` is true when all (four) permissions in the
    group are (visually) checked.

    When a specific permission is checked/unchecked it is
    added/removed from `this.args.parent_group_model.permissions`. Thus,
    in order to say if all group was checked (i.e. selected)
    it is sufficient to see if all group permissions i.e (
    `this.args.perm_group.perms`) are included in
    `this.args.parent_group_model.permissions`.
    */
    let parent_group_model_perm_ids, group_perm_ids;

    if (this.args.new_group_perms) {
      parent_group_model_perm_ids = this.args.new_group_perms.map((p) => p.id);
    }
    if (this.args.perm_group) {
      group_perm_ids = this.args.perm_group.perms.map((p) => p.id);
    }

    if (parent_group_model_perm_ids) {
      return group_perm_ids.every((v) => parent_group_model_perm_ids.includes(v));
    }


    return false;
  }

  set isChecked(value) {
    // pass
  }

  @action
  onChange(value, parent_group_model, perm) {
    /*
    This function is triggered from parent_group_model::Permission component.

    `value` is set to `true` (or `false`) depending
    if user checked/uncheked given permission referenced by `perm`.
    `parent_group_model` is component's current parent_group_model (which is actually available
    as `this.args.parent_group_model`).
    */
    if (!value) {
      this.removePermission(parent_group_model, perm);
      this.check_all = false;
    } else {
      this.addPermission(parent_group_model, perm);
    }
  }

  @action
  onChangeGroupPermissions(event) {
    /*
    Check/uncheck all permissions which are part
    of the group.
    */
    let value = event.target.checked,
      that = this;

    if (value) {
      // user chose to select (he checked) all
      // permissions in the group
      this.args.perm_group.perms.forEach((perm) => {
        this.addPermission(perm);
      });
    } else {
      // user chose to unselect (i.e. he unchecked) all
      // permissions in the group
      this.args.perm_group.perms.forEach((perm) => {
        this.removePermission(perm);
      });
    }
  }

  addPermission(perm) {
    if (this.args.new_group_perms['push']) {
      this.args.new_group_perms.push(perm);
    } else if (this.args.new_group_perms['addObject']) {
      this.args.new_group_perms.addObject(perm);
    }
  }

  removePermission(perm) {
    if (this.args.new_group_perms['pop']) {
      this.args.new_group_perms.pop(perm);
    } else if (this.args.new_group_perms['removeObject']) {
      this.args.new_group_perms.removeObject(perm);
    }

  }

}

export default PermissionGroupComponent;
