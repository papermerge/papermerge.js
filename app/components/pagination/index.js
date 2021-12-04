import Component from '@glimmer/component';


export default class PaginationComponent extends Component {
  /*
  Arguments:
    @object
    @node
    @hint = { "left" | "right" }
  */

  get pages() {
    let result = [],
      pages;

    pages = this.args.object.pages; // total number of pages

    if (pages == 1) {
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
