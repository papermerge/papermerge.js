import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { TrackedArray } from 'tracked-built-ins';


export default class NewFolderComponent extends Component {
  @tracked title = '';
  @tracked errors = new TrackedArray();
  @service store;
  @service currentUser;

  reset() {
    this.title = '';
  }

  @action
  async onSubmit() {
    let new_folder, new_record;

    new_folder = this.store.createRecord('folder');
    new_folder.title = this.title;
    new_folder.parent = this.args.node;
    try {
      new_record = await new_folder.save();
    } catch (exception) {
      this.errors = exception['errors'];
      return;
    }

    this.args.onClose(new_record);
    this.reset();
  }

  @action
  onCancel() {
    this.args.onClose();
    this.reset();
  }

  @action
  onHide() {
    this.reset();
  }
}
