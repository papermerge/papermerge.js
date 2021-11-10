import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import BaseComponent from "./base";


export default class DeleteNodeComponent extends BaseComponent {
  @service store;
  @service currentUser;

  get nodes() {
    return this.args.selectedNodes;
  }

  @action
  onSubmit() {
    this.nodes.forEach((node) => {
      node.destroyRecord();
    });

    this.args.onClose();
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
