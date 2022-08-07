import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

import Component from "@glimmer/component";


export default class ExtractPagesComponent extends Component {
  @service store;
  @service currentUser;
  @tracked single_page = true;
  @tracked _title_format = undefined;
  @tracked error_message;

  get page_ids() {
    return this.args.selected_pages.map(page => page.id);
  }

  get target_folder() {
    if (this.args.extra) {
      return this.args.extra;
    }
    return undefined;
  }

  @action
  async onSubmit() {
    let data = {
      page_ids: this.page_ids,
      target_folder: this.target_folder,
      single_page: this.single_page
    };

    if (this.title_format != undefined && this.title_format != '') {
      data['title_format'] = this.title_format;
    }

    this.error_message = await this.args.onSubmit.perform(data);
  }

  get count() {
    if (this.args.page_ids) {
      return this.args.page_ids.length;
    }
    return 0;
  }

  get dst_title() {
    if (this.args.extra) {
      return this.args.extra.title;
    }
    return '';
  }

  get title_format() {
    if (this._title_format === undefined) {
      return this.default_title;
    }

    return this._title_format;
  }

  set title_format(value) {
    this._title_format = value;
  }

  get default_title() {
    let title;

    if (this.args.doc && this.args.doc) {
      title = this.args.doc.title;

      return title.substring(
        0,
        title.indexOf('.')
      );
    }

    return '';
  }

  get inProgress() {
    return this.args.onSubmit.isRunning;
  }

  @action
  onCancel() {
  }

}
