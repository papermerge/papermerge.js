import Component from '@glimmer/component';


export default class SearchResultsComponent extends Component {


  get search_results() {
    return this.args.model;
  }

  get no_results() {
    if (this.search_results) {
      return this.search_results.length == 0;
    }

    return true;
  }
}