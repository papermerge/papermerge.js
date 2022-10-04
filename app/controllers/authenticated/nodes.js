import DualPanelBaseController from "./dualpanel_base";
import { service } from '@ember/service';
import { tracked, TrackedObject, TrackedArray } from 'tracked-built-ins';
import { task } from 'ember-concurrency';
import { setup_pages } from "../../routes/authenticated/utils";


export default class NodesController extends DualPanelBaseController {

  @service router;
  @service store;

  // pages attribute is updated in `setupController` of the `route`
  @tracked pages = new TrackedArray([]);
  // pagination/pages for extra panel

  queryParams = ['page']
  @tracked page = 1;
  @tracked extra_page = 1;

  @task({drop: true})
  *onPaginationPageClick(page_number, hint) {

    let meta, children, node;

    if (hint === 'right') {
      if (this.extra_id) {
        this.loadNodeData.hint = 'right';
        this.loadNodeData.node_id = this.extra_id;
        this.extra_page = page_number;
        localStorage.setItem('extra_page', page_number);

        [{children, meta}, node] = yield this.loadNodeData.perform({
          store: this.store,
          node_id: this.extra_id,
          page: this.extra_page,
        });

        this.extra = new TrackedObject({
          current_node: node,
          children: children,
          pages: setup_pages({meta})
        });
      }
    } else {
      this.page = page_number;
    }
  }

  @task({ drop: true })
  *onDuplicatePanel(hint) {
    let node_id = this.router.currentRoute.params['node_id'],
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
          page: this.extra_page
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
          this.extra_id
        );
      } // this.extra_type
    }
  }
}
