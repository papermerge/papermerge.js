import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

import Component from "@glimmer/component";


export default class MovePagesComponent extends Component {
  @service store;
  @service currentUser;
  @tracked single_page = true;
  @tracked _position = 0;
  @tracked _merge = false;

  get position() {
    return [
      { key: 0, value: 'beginning' },
      { key: -1, value: 'end' },
    ];
  }

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

  @action
  onPositionChanged(event) {
    this._position = event.target.value;
    console.log(`this._position=${this._position}`);
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

    return undefined;
  }

  @action
  onCancel() {
  }

}
