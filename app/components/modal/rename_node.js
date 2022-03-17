import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import BaseComponent from "./base";


export default class RenameNodeComponent extends BaseComponent {
  @service store;
  @service currentUser;


  get new_title() {

    if (this.title) {
      return this.title;
    }

    if (this.node) {
      return this.node.title
    }

    return '';
  }

  set new_title(value) {
    this.title = value;
  }

  get node() {
    return this.args.node;
  }

  @action
  onSubmit() {
    this.node.title = this.title;
    this.node.save();
    this.args.onClose();
    this.title = '';
  }

  @action
  onCancel() {
    this.args.onClose();
    this.title = '';
  }

}
