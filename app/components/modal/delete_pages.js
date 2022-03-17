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
    this.args.onSubmit(pages_copy);
  }

  @action
  onCancel() {
  }

  get count() {
    return this.pages.length;
  }
}
