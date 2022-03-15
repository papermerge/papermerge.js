import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

import BaseComponent from "./base";


export default class MovePagesComponent extends BaseComponent {
  @service store;
  @service currentUser;
  @tracked single_page = true;

  get page_ids() {
    return this.args.page_ids;
  }

  @action
  onSubmit() {
    this.args.onSubmit({
      page_ids: this.page_ids,
      dst: this.args.dst_folder,
      single_page: this.single_page
    });
  }

  get count() {
    if (this.args.page_ids) {
      return this.args.page_ids.length;
    }
    return 0;
  }

  get dst_title() {
    if (this.args.dst_folder) {
      return this.args.dst_folder.title;
    }
    return '';
  }

  @action
  onCancel() {
  }

}
