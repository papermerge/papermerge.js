import Controller from '@ember/controller';


export default class TagsController extends Controller {

  queryParams = ['page', 'size'];
  page = 1;
  size = 10;

  get pages() {

    let result = [],
      number_of_pages = 0,
      number;

    if (this.pagination) {
      number_of_pages = this.pagination.pages;

      for (let i=0; i < number_of_pages; i++ ) {
        number = i + 1;
        if (number == this.pagination.page) {
          result.push({
            'number': number,
            'active': true
          });
        } else {
          result.push({'number': number});
        }
      }
    }

    return result;
  }

  get pagination() {
    if (this.model && this.model.meta) {
      return this.model.meta.pagination;
    }

    return undefined;
  }
}
