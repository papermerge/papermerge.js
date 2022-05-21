import Controller from '@ember/controller';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from 'tracked-built-ins';
import { TrackedObject } from 'tracked-built-ins';


export default class DualPanelBaseController extends Controller {

  @service currentUser;
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
      node_id;

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
}
