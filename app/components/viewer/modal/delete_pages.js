import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

import Component from '@glimmer/component';


export default class DeletePagesComponent extends Component {
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
