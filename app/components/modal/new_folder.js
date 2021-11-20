import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class NewFolderComponent extends Component {
  @tracked title = '';
  @service store;
  @service currentUser;

  @action
  async onSubmit() {
    let new_folder, new_record;

    new_folder = this.store.createRecord('folder');
    new_folder.title = this.title;
    new_folder.parent = this.args.node;
    new_record = await new_folder.save();

    this.args.onClose(new_record);
    this.title = '';
  }

  @action
  onCancel() {
    this.args.onClose();
    this.title = '';
  }
}
