import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { Modal } from 'bootstrap';


export default class NewFolderComponent extends Component {
  @tracked title = '';
  @service store;

  @action
  onSubmit() {
    let new_folder;

    new_folder = this.store.createRecord('node');
    new_folder.title = this.title;
    new_folder.save();

    this.args.onClose();
    this.title = '';
  }

  @action
  onCancel() {
    this.args.onClose();
    this.title = '';
  }
}
