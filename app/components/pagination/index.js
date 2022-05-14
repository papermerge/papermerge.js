import Component from '@glimmer/component';


export default class PaginationComponent extends Component {

  get more_than_one_page() {
    return this.args.pages && this.args.pages.length > 1;
  }

}