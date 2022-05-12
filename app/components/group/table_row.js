import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

class TableRowComponent extends Component {
  // keeps track of the ID of the group currently
  // being edited i.e. in edit mode
  @tracked edit_mode_id = 0;
  @service store;

  @action
  async onRemove(group) {
    await group.destroyRecord();
    this.args.onDelete();
  }

  @action
  onEdit(group) {
    this.edit_mode_id = group.id;
  }

  @action
  onCancel() {
    this.edit_mode_id = undefined;
  }

  @action
  async onSaveChanges(group) {
    let that = this;

    if (!group) {
      console.warn('onSaveChanges received an undefined group object');
      return;
    }

    this.edit_mode_id = undefined;

    if (group.id) {
      this.store.findRecord('group', group.id).then((found_group) => {
        found_group.name = group.name;
        found_group.save();
      });
    } else {
      console.warn(
        `onSaveChanges received group=${group} object without group ID`
      );
      return;
    }
  }
}

export default TableRowComponent;
