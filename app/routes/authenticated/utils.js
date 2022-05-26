import { TrackedArray } from 'tracked-built-ins';
import { TrackedObject } from 'tracked-built-ins';

async function getPanelInfo({store, node_id, page}) {
  /*
    Returns current_node model its
    children nodes models and associated pagination info.

    `page` is integer number of the page
    `store` is "@service store" thingy
  */
  let node;
  const adapter = store.adapterFor('node');
  const {children, meta} = await adapter.getChildren({node_id, page});


  node = await adapter.getFolder(node_id);

  return {
    current_node: node,
    children: children,
    meta: meta
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

function setupDualController({controller, store, requests}) {
  /*
    Open secondary panel that match `extra_id` and `extra_type` keys from localStorage.

    Secondary panel is opened by setting `extra` variable on the controller.
  */
  let extra_id,
    extra_type,
    extra_page,
    last_version,
    pages_with_url,
    extra,
    ex;

  extra_id = localStorage.getItem('extra_id');
  extra_type = localStorage.getItem('extra_type');
  extra_page = localStorage.getItem('extra_page') || 1;

  if (extra_id) { // There should be an extra panel?
    if (extra_type == 'folder') { // is that extra panel - commander panel?
      // if extra panel is already opened, leave it the way it is;
      if (controller.get('extra_id')) {
        // do nothing;
        return;
      }
      // extra panel is supposed to be open, but it is not;
      // just open it via `onPanelToggle`
      console.log(`onPanelToggle: open extra_id=${extra_id}, extra_page=${extra_page}`)
      controller.onPanelToggle.perform('open', extra_id, extra_page);
    } else if (extra_type == 'doc'){
      // extra panel is viewer
      // if extra panel is already opened, leave it the way it is;

      ex = controller.get('extra');

      if (ex && ex.doc && ex.doc.id == extra_id) {
        // do nothing;
        return;
      }

      store.findRecord(
        'document',
        extra_id
      ).then((doc) => {

        if (!doc) {
          console.log('setupDualController: doc is undefined.');
          return;
        }
        last_version = doc.last_version;

        if (!last_version) {
          console.log('setupDualController: last_version is undefined');
          return;
        }
  
        pages_with_url = last_version.pages.map(
          (page) => requests.loadImage.perform(
            page,
            'image/svg+xml',
            'force-cache'
          )
        );

        extra = new TrackedObject({
          doc: doc,
          document_versions: doc.versions,
          last_document_version: doc.last_version,
          pages: pages_with_url
        });

        controller.set('extra', extra);
        controller.set('extra_id', doc.id);
        controller.set('extra_type', 'doc');
      });
    }
  } else {
    if (controller.get('extra')) {
      controller.set('extra', undefined);
    }
  }

}

export {
  setup_pages,
  getPanelInfo,
  setupDualController
}