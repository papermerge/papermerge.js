import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

import BaseComponent from "./base";


export default class DeleteNodeComponent extends BaseComponent {
  @service store;
  @service currentUser;

  get nodes() {
    return this.args.selectedNodes;
  }

  @action
  onSubmit() {
    let nodes_copy = A(this.nodes);

    this.nodes.forEach((node) => {
      node.destroyRecord();
    });

    this.args.onClose(nodes_copy);
  }

  get titles_to_be_deleted() {
    return this.nodes.map(
      (node) => {
        return ` ${node.title}`;
      }
    );
  }

  get count() {
    return this.nodes.length;
  }

  @action
  onCancel() {
    this.args.onClose();
  }

}
