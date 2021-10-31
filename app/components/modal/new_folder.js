import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { Modal } from 'bootstrap';

export default class NewFolderComponent extends Component {
  @tracked title = '';

  @action
  onSubmit() {
    console.log(`title=${this.title}`);
    this.args.onClose();
    this.title = '';
  }

  @action
  onCancel() {
    this.args.onClose();
    this.title = '';
  }
}
