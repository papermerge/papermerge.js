import Component from '@glimmer/component';


export default class PaginationComponent extends Component {

  get pages() {
    let result = [],
      page,
      pages;

    page = this.args.page; // number of current page
    pages = this.args.pages; // total number of pages

    if (pages == page) {
      return [];
    }

    for(let i=0; i < pages; i++) {

      if (this.args.object.page === i + 1) {
        result.push({
          number: i + 1,
          current: true,
          query: { 'page': i + 1 }
        });
      } else {
        result.push({
          number: i + 1,
          current: false,
          query: {'page': i + 1}
        });
      }
    }

    return result;
  }
}
