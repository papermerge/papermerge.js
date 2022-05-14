import { TrackedArray } from 'tracked-built-ins';

async function getPanelInfo({store, node_id, page}) {
  /*
    Returns current_node model its
    children nodes models and associated pagination info.

    `page` is integer number of the page
    `store` is "@service store" thingy
  */
  let node;
  const adapter = store.adapterFor('node');
  const {children, pagination} = await adapter.getChildren({node_id, page});


  node = await adapter.getFolder(node_id);

  return {
    current_node: node,
    children: children,
    pagination: pagination
  };
}


function setup_pages(model) {
  /*
    Returns an array of numbered pages.

    This (tracked) array is used for show pagination
    items.
  */
  let pages = new TrackedArray([]),
    pagination,
    number_of_pages,
    number;

  if (model && model.meta) {
    pagination = model.meta.pagination;
  }

  if (pagination) {
    number_of_pages = pagination.pages;

    for (let i=0; i < number_of_pages; i++ ) {
      number = i + 1;
      if (number == pagination.page) {
        pages.push({
          'number': number,
          'active': true
        });
      } else {
        pages.push({'number': number});
      }
    }
  }

  return pages;
}

export {
  setup_pages,
  getPanelInfo
}