import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from 'tracked-built-ins';
import { TrackedObject } from 'tracked-built-ins';


export default class DualPanelBaseController extends Controller {

  @service currentUser;
  @service store;
  @service requests;

  @tracked extra_id = null;
  @tracked extra_type = null; // can be either 'doc' or 'node'
  @tracked extra;
  /*
    Track loading information of a node clicked in secondary
    panel.
    Information about node clicked is used
    to display rotating spinner (user visual feedback)
    about loading data of the node which user just clicked.

    `node_clicked_state` is updated in controller.
  */
  @tracked node_clicked_state = new TrackedObject({
    'hint': undefined,
    'node_id': undefined
  });

  /*
    Track loading information of a node clicked in primary
    panel.

    `currently_loading_state` is updated in router.
  */
  @tracked currently_loading_state = new TrackedObject({
    'hint': undefined,
    'node_id': undefined
  });

  @tracked swap_panels = false;

  get dualpanel_mode() {
    return this.extra_id;
  }

  @task({drop: true})
  *loadNodeData({store, node_id, page}) {
    /*
      Returns current_node model its
      children nodes models and associated pagination info.

      `page` is integer number of the page
      `store` is "@service store" thingy
    */
    let result, adapter;

    adapter = store.adapterFor('node');

    result = yield Promise.all([
      adapter.getChildren({node_id, page}),
      adapter.getFolder(node_id)
    ]);

    return result;
  }

  @task({ drop: true })
  *onNodeClicked(node, hint, node_type) {

    let children,
      pagination,
      current_node,
      node_id,
      doc,
      last_version,
      pages_with_url;

    node_id = node.get('id');

    this.node_clicked_state['node_id'] = node_id;
    this.node_clicked_state['hint'] = hint;

    if (hint == 'right') {
      // secondary panel
      if (node_type == 'folder') {
        // open commander in secondary panel
        this.extra_id = node_id;
        this.loadNodeData.hint = hint;
        this.loadNodeData.node_id = this.extra_id;
        [{children, pagination}, current_node] = yield this.loadNodeData.perform({
          store: this.store,
          node_id: this.extra_id,
          page: 1
        });

        this.extra = new TrackedObject({
          current_node: current_node,
          children: children,
          pagination: pagination
        });

        this.node_clicked_state['node_id'] = undefined;
        this.node_clicked_state['hint'] = undefined;
      } else {
        // open viewer in secondary panel
        console.log(`Open viewer in secondary panel. node_id=${node_id}`);
        doc = yield this.store.findRecord(
          'document',
          node_id,
          { reload: true }
        );
    
        last_version = doc.last_version;
    
        pages_with_url = last_version.pages.map(
          (page) => this.requests.loadImage.perform(page, 'image/svg+xml')
        );

        this.extra = new TrackedObject({
          doc: doc,
          document_versions: doc.versions,
          last_document_version: doc.last_version,
          pages: pages_with_url
        });

      }

    } else {
      // primary panel
      if (node_type == 'folder') {
        this.router.replaceWith('authenticated.nodes', node_id);
      } else {
        this.router.replaceWith('authenticated.document', node_id);
      }
    }
  }

  @task *onPanelToggle(hint) {
    /*
      hint is either "left" or "right" depending where
      the onPanelToggle originated from.
    */
    let home_folder,
      children, node, pagination;

    if (this.extra_id) {
      // closing secondary panel
      this.extra = null;
      this.extra_id = null;
      this.extra_type = null;
      this.swap_panels = false;
      localStorage.setItem('extra_id', undefined);
      localStorage.setItem('extra_type', undefined);
    } else {
      // opening secondary panel
      this.extra = new TrackedObject({});

      home_folder = yield this.currentUser.user.home_folder;
      this.extra_id = home_folder.get('id');
      this.extra_type = 'folder';

      this.loadNodeData.hint = undefined;
      this.loadNodeData.node_id = this.extra_id;
      [{children, pagination}, node] = yield this.loadNodeData.perform({
        store: this.store,
        node_id: this.extra_id,
        page: 1
      });

      this.extra = new TrackedObject({
        current_node: node,
        children: children,
        pagination: pagination
      });

      // save extra id/extra type for 'other' controller:
      // if we are now in 'nodes controller',then 'other' is 'documents controller'
      // if we are now in 'documents controller, then 'other' is 'nodes controller'
      localStorage.setItem('extra_id', this.extra_id);
      localStorage.setItem('extra_type', this.extra_type);
    }
  }

  @action
  onSwapPanels() {
    this.swap_panels = !this.swap_panels;
  }

}
