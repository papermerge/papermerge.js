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
  @tracked node_clicked_state = new TrackedObject({
    'hint': undefined,
    'node_id': undefined
  });

  @tracked currently_loading_state = new TrackedObject({
    'hint': undefined,
    'node_id': undefined
  });

  get dualpanel_mode() {
    return this.extra_id;
  }

  async getPanelInfo({store, node_id, page}) {
    /*
      Returns current_node model its
      children nodes models and associated pagination info.

      `page` is integer number of the page
      `store` is "@service store" thingy
    */
    const adapter = store.adapterFor('node');

    return Promise.all([
      adapter.getChildren({node_id, page}),
      adapter.getFolder(node_id)
    ]);
  }

  @task({ drop: true })
  *onNodeClicked(node, hint) {

    let children,
      pagination,
      current_node,
      node_id;

    node_id = node.get('id');
    console.log(`node=${node} from hint=${hint} clicked`);

    this.node_clicked_state['node_id'] = node_id;
    this.node_clicked_state['hint'] = hint;

    if (hint == 'right') {
      this.extra_id = node_id;
      [{children, pagination}, current_node] = yield this.getPanelInfo({
        store: this.store,
        node_id: this.extra_id,
        page: 1
      });

      this.extra = new TrackedObject({
        current_node: current_node,
        children: children,
        pagination: pagination
      });
    } else {

      this.router.replaceWith('authenticated.nodes', node_id);
    }
  }
}
