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

  get strategy_options() {
    return [
      { key: 'append', value: 'Append' },
      { key: 'replace', value: 'Replace' },
    ]
  }

  get position() {
    return [
      { key: 0, value: 'Beginning' },
      { key: -1, value: 'End' },
    ];
  }

  get page_ids() {
    return this.args.selected_pages.map(page => page.id);
  }

  @action
  onSubmit() {
    this.args.onSubmit.perform({
      page_ids: this.page_ids,
      target_doc: this.target_doc,
      position: this._position,
      merge: this.merge
    });
  }

  @action
  onStrategyChanged(event) {
    let strategy = event.target.value;

    if (strategy === 'replace') {
      this._merge = true;
    } else {
      this._merge = false;
    }

  }

  @action
  onPositionChanged(event) {
    this._position = parseInt(event.target.value);
  }

  get count() {
    if (this.args.page_ids) {
      return this.args.page_ids.length;
    }
    return 0;
  }

  get target_doc() {

    if (this.args.extra) {
      return this.args.extra;
    }

    return undefined;
  }

  get dst_title() {
    if (this.args.extra) {
      return this.args.extra.title;
    }

    return undefined;
  }

  get merge() {
    return this._merge;
  }

  @action
  onCancel() {
  }

}
