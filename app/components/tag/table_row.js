import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class TableRowComponent extends Component {
  @tracked edit_mode_id = 0;

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
}