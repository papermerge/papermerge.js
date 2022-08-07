import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import BaseComponent from "./base";


export default class RenameNodeComponent extends BaseComponent {
  @service store;
  @service currentUser;
  @tracked _title = undefined;

  get title() {
    if (this._title === undefined) {
      return this.default_title;
    }

    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get default_title() {
    if (this.node) {
      return this.node.title;
    }

    return 'noname';
  }

  get node() {
    return this.args.node;
  }

  reset() {
    this._title = undefined;
  }

  @action
  onSubmit() {
    this.node.title = this.title;
    this.node.save();
    this.args.onClose();
    this.reset();
  }

  @action
  onCancel() {
    this.args.onClose();
    this.reset();
  }

}
