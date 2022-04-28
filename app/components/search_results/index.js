import Component from '@glimmer/component';


export default class SearchResultsComponent extends Component {


  get nodes() {
    return this.args.nodes;
  }

  get view_mode() {
    return 'list';
  }

  get empty_results() {
    if (this.nodes) {
      return this.nodes.length >= 1;
    }

    return true;
  }
}