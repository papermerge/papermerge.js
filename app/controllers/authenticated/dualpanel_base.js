import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from 'tracked-built-ins';
import { TrackedObject } from 'tracked-built-ins';
import { setup_pages } from '../../routes/authenticated/utils';


export default class DualPanelBaseController extends Controller {

  @service currentUser;
  @service store;
  @service requests;

  /*
    Hold's ID of the node (which can be either document or folder) displayed
    in extra panel.
    Extra panel is the panel which initially opens on the right side,
    that's why it is called 'right' panel as well.
    Yet another convinient way to think of extra panel (right panel)
    is as 'seconday panel'.
    Throughout the code - 'right', 'extra' and 'secondary' panel mean
    same thing.
    'Left' panel is also called 'primary panel'.
  */
  @tracked extra_id = null; // Node ID displayed in right/secondary panel
  @tracked extra_type = null; // = 'doc' | 'folder'
  /*
  If extra_type == 'folder':
    extra = {current_node, children, pagination}

  if extra_type == 'doc':
    extra = { doc, document_versions, last_document_version, pages }

  if extra_id and extra_type are null:
    extra = null
  */
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

  /* When 'true' swap panel i.e. present panels in reverse order */
  @tracked swap_panels = false;

  get dualpanel_mode() {
    return this.extra_id;
  }

  @task({drop: true})
  *loadNodeData({store, node_id, page, cache}) {
    /*
      Returns current_node model its
      children nodes models and associated pagination info.

      `page` is integer number of the page
      `store` is "@service store" thingy
    */
    let result, adapter;

    adapter = store.adapterFor('node');

    result = yield Promise.all([
      adapter.getChildren({node_id, page, cache}),
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
        localStorage.setItem('extra_id', node_id);
        localStorage.setItem('extra_type', 'folder');
      } else {

        // open viewer in secondary panel
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

        // save extra id/extra type for 'other' controller:
        // if we are now in 'nodes controller',then 'other' is 'documents controller'
        // if we are now in 'documents controller, then 'other' is 'nodes controller'
        localStorage.setItem('extra_id', doc.id);
        localStorage.setItem('extra_type', 'doc');

        this.extra_type = 'doc';
        this.extra_id = doc.id;
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

  @task *onPanelToggle(operation, extra_id, page, cache) {
    /*
      hint is either "left" or "right" depending where
      the onPanelToggle originated from.
    */
    let home_folder,
      children, node, meta;

    if (operation == 'close') {
      // closing secondary panel
      this.extra = null;
      this.extra_id = null;
      this.extra_page = 1;
      this.extra_type = null;
      this.swap_panels = false;

      localStorage.removeItem('extra_id');
      localStorage.removeItem('extra_type');
      localStorage.removeItem('extra_page');

    } else if (operation == 'open'){
      // opening secondary panel
      this.extra = new TrackedObject({});

      if (extra_id) {
        this.extra_id = extra_id;
      } else {
        home_folder = yield this.currentUser.user.home_folder;
        this.extra_id = home_folder.get('id');
      }

      if (page) {
        this.extra_page = page;
      }

      this.extra_type = 'folder';

      this.loadNodeData.hint = undefined;
      this.loadNodeData.node_id = this.extra_id;
      [{children, meta}, node] = yield this.loadNodeData.perform({
        store: this.store,
        node_id: this.extra_id,
        page: this.extra_page,
        cache: cache
      });

      this.extra = new TrackedObject({
        current_node: node,
        children: children,
        pages: setup_pages({meta})
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
