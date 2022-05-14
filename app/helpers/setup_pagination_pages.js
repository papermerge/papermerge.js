import { helper } from '@ember/component/helper';


export function setup_pagination_pages([page, total_pages]) {
  /*
    Returns an array of numbered pages.

    This (tracked) array is used for show pagination
    items.
  */
  let pages = [],
    number;

  for (let i=0; i < total_pages; i++ ) {
    number = i + 1;
    if (number == page) {
      pages.push({
        'number': number,
        'active': true
      });
    } else {
      pages.push({'number': number});
    }
  }

  return pages;
}

export default helper(setup_pagination_pages);
