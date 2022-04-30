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
    let response = await this.requests.search({
      text: this.query
    });
    let data = await response.json();

    this.autocomplete_items = data.map(item => {
      let highlight = '';

      if (item.highlight) {
        highlight = item.highlight.join(' ');
      }

      return {
        'id': item.id,
        'title': item.title,
        'type': item.node_type,
        'highlight': highlight,
        'path': item.breadcrumb.join(' / '),
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
      this.router.transitionTo('authenticated.document', item.id);
      this._reset();
    } else if (item.type == 'folder') {
      this.router.transitionTo('authenticated.nodes', item.id);
      this._reset();
    }
  }

  @action
  onClickOutside() {
    this._reset();
  }

  _reset() {
    this.query = '';
    this.autocomplete_items = [];
  }
}
