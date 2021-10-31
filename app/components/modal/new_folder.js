import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { Modal } from 'bootstrap';


export default class NewFolderComponent extends Component {
  @tracked title = '';
  @service store;
  @service currentUser;

  @action
  onSubmit() {

    this.currentUser.user.home_folder.then((home_folder) => {
      let new_folder;

      new_folder = this.store.createRecord('folder');
      new_folder.title = this.title;
      new_folder.parent = home_folder;
      new_folder.save();

      this.args.onClose();
      this.title = '';
    });

  }

  @action
  onCancel() {
    this.args.onClose();
    this.title = '';
  }
}
