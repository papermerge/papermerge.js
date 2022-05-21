import { action } from '@ember/object';
import DualPanelBaseController from "./dualpanel_base";
import { service } from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';
import { task } from 'ember-concurrency';


export default class NodesController extends DualPanelBaseController {

  @service router;
  @service store;

  @task *onPanelToggle(hint) {
    /*
      hint is either "left" or "right" depending where
      the onPanelToggle originated from.
    */
    let home_folder, that = this,
      children, node, pagination;

    if (this.extra_id) {
      // closing secondary panel
      this.extra = null;
      this.extra_id = null;
      this.extra_type = null;
      this.swap_panels = false;
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
    }
  }

  @action
  onSwapPanels() {
    this.swap_panels = !this.swap_panels;
  }

  @task({ drop: true })
  *onDuplicatePanel(hint) {
    let node_id = this.router.currentRoute.params['node_id'],
      query_params,
      home_folder, that = this,
      children, node, pagination;

    if (hint === 'left') {
      if (this.extra_id) {

        this.extra_id = node_id;
        this.extra_type = 'folder';

        this.loadNodeData.hint = 'right';
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
      }
    } else { // hint == 'right'
      if (this.extra_type == 'folder') {
        this.router.transitionTo(
          'authenticated.nodes',
          this.extra_id
        );
      } else {
        this.router.transitionTo(
          'authenticated.document',
          this.extra_id,
          query_params
        );
      } // this.extra_type
    }
  }
}
