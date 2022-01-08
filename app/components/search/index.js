import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

// https://discuss.emberjs.com/t/how-to-force-re-render-a-glimmer-component/18150
export default class SearchComponent extends Component {
  @service requests;
  @tracked query;
  @tracked autocomplete_items = A([]);
  /*
  @tracked autocomplete_items = A([
    {
      'title': 'invoice.pdf',
      'type': 'document',
      'path': 'Home / My Documents / Invoices'
    },
    {
      'title': 'invoice2.pdf',
      'type': 'document',
      'path': 'Home / My Documents'
    },
    {
      'title': 'invoice3.pdf',
      'type': 'document',
      'path': 'Home / My Documents / Invoices'
    },
    {
      'title': 'invoice.pdf',
      'type': 'document',
      'path': 'Home'
    },
  ]);
  */

  @action
  async doSearch() {
    let response = await this.requests.search(this.query);
    let data = await response.json();

    this.autocomplete_items = data.map(item => {
      return {
        'title': item.title,
        'type': 'document',
        'path': item.breadcrumb,
      }
    });
  }
}
