import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

import BaseComponent from "./base";


export default class ExtractPagesComponent extends BaseComponent {
  @service store;
  @service currentUser;
  @tracked single_page = true;
  @tracked _title_format;
  @tracked error_message;

  get page_ids() {
    return this.args.selected_pages.map(page => page.id);
  }

  get target_folder() {
    if (this.args.extra && this.args.extra.current_node) {
      return this.args.extra.current_node;
    }
    return undefined;
  }

  @action
  async onSubmit() {
    this.error_message = await this.args.onSubmit.perform({
      page_ids: this.page_ids,
      target_folder: this.target_folder,
      single_page: this.single_page,
      title_format: this.title_format
    });
  }

  get count() {
    if (this.args.page_ids) {
      return this.args.page_ids.length;
    }
    return 0;
  }

  get dst_title() {
    if (this.args.extra && this.args.extra.current_node) {
      return this.args.extra.current_node.title;
    }
    return '';
  }

  get title_format() {
    let title;

    if (this._title_format) {
      return this._title_format;
    }

    if (this.args.doc && this.args.doc) {
      title = this.args.doc.title;

      return title.substring(
        0,
        title.indexOf('.')
      );
    }

    return '';
  }

  set title_format(value) {
    this._title_format = value;
  }

  get inProgress() {
    return this.args.onSubmit.isRunning;
  }

  @action
  onCancel() {
  }

}
