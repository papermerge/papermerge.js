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

      if (hint === "right") {
        // user decided to close left panel
        this.router.replaceWith('authenticated.nodes', this.extra_id);
      }
      this.extra = null;
      this.extra_id = null;
      this.extra_type = null;
    } else {
      this.extra = new TrackedObject({});

      home_folder = yield this.currentUser.user.home_folder;
      this.extra_id = home_folder.get('id');
      this.extra_type = 'folder';

      [{children, pagination}, node] = yield this.getPanelInfo({
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
    let node_id,
      query_params;

    node_id = this.router.currentRoute.params['node_id'];
    query_params = {
      'queryParams': {
        'extra_id': node_id,
        'extra_type': 'folder'
      }
    }

    if (this.extra_id && this.extra_type == 'folder') {
      this.router.transitionTo(
        'authenticated.nodes',
        this.extra_id,
        query_params
      );
    } else if (this.extra_id && this.extra_type == 'doc') {
      this.router.transitionTo(
        'authenticated.document',
        this.extra_id,
        query_params
      );
    }
  }

  @action
  onDuplicatePanel(hint) {
    let node_id = this.router.currentRoute.params['node_id'],
      query_params;


    if (hint === 'left') {
      query_params = {
        'queryParams': {
          'extra_id': node_id,
          'extra_type': 'folder'
        }
      }

      if (this.extra_id) {
        this.router.transitionTo(
          'authenticated.nodes',
          node_id,
          query_params
        );
      }
    } else { // hint == 'right'
      query_params = {
        'queryParams': {
          'extra_id': this.extra_id,
          'extra_type': this.extra_type
        }
      }

      if (this.extra_type == 'folder') {
        this.router.transitionTo(
          'authenticated.nodes',
          this.extra_id,
          query_params
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
