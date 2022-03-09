import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

import BaseComponent from "./base";


export default class DeletePagesComponent extends BaseComponent {
  @service store;
  @service currentUser;

  get pages() {
    return this.args.selectedPages;
  }

  @action
  onSubmit() {
    let pages_copy = A(this.pages);
  
    this.args.onClose(pages_copy);
  }

  get count() {
    return this.pages.length;
  }

  @action
  onCancel() {
    this.args.onClose();
  }

}
