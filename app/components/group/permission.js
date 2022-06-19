import Component from '@glimmer/component';


class PermissionComponent extends Component {
  get isChecked() {
    /*
    A permission is checked only if given current permission
    is part of current parent_group_model model available via `this.args.parent_group_model`.
    */
    let parent_group_model_perm_ids;

    parent_group_model_perm_ids = this.args.parent_group_model.permissions.map((p) => p.id);

    return parent_group_model_perm_ids.includes(this.args.permission.id);
  }

  set isChecked(value) {
    /*
    Just forwards the event to parent component, which will take care of
    adding/removing permission.
    */
    this.args.onChange(value, this.args.parent_group_model, this.args.permission);
  }
}

export default PermissionComponent;
