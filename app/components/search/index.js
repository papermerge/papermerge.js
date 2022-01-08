import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';


export default class SearchComponent extends Component {
  @service requests;
  @service router;
  @tracked query;
  @tracked autocomplete_items = A([]);

  @action
  async onKeyup() {
    let response = await this.requests.search(this.query);
    let data = await response.json();

    this.autocomplete_items = data.map(item => {
      return {
        'document_id': item.document_id,
        'title': item.title,
        'type': 'document',
        'path': item.breadcrumb,
      }
    });
  }

  @action
  clearSearch() {
    this._reset();
  }

  @action
  openItem(item) {
    if (item.type == 'document') {
      this.router.transitionTo('authenticated.document', item.document_id);
      this._reset();
    }
  }

  _reset() {
    this.query = '';
    this.autocomplete_items = [];
  }
}
