import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class TableRowComponent extends Component {
  // keeps track of the ID of the tag currently
  // being edited i.e. in edit mode
  @tracked edit_mode_id = 0;
  @service store;
  @service router;

  @action
  async onRemove(tag) {
    await tag.destroyRecord();
  }

  @action
  onEdit(tag) {
    this.edit_mode_id = tag.id;
  }

  @action
  onCancel() {
    this.edit_mode_id = undefined;
  }

  @action
  async onSaveChanges(tag) {
    let that = this;

    if (!tag) {
      console.warn('onSaveChanges received an undefined tag object');
      return;
    }

    this.edit_mode_id = undefined;

    if (tag.id) {
      this.store.findRecord('tag', tag.id).then((found_tag) => {
        found_tag.name = tag.name;
        found_tag.description = tag.description;
        found_tag.save().then(() => {
          // refresh pinned tags on the sidebar
          that.router.refresh();
        });
      });
    } else {
      console.warn(`onSaveChanges received tag=${tag} object without tag ID`);
      return;
    }
  }
}
