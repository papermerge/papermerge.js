import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class RenameNodeComponent extends Component {
  @service store;
  @service currentUser;


  get new_title() {
    let selected_nodes;

    if (this.title) {
      return this.title;
    }

    selected_nodes = this.args.selectedNodes;
    if (selected_nodes && selected_nodes[0]) {
      return selected_nodes[0].title;
    }

    return '';
  }

  set new_title(value) {
    this.title = value;
  }

  get node() {
    return this.args.selectedNodes[0];
  }

  @action
  onSubmit() {

    this.store.findRecord('node', this.node.id).then(
      (node) => {
        node.title = this.title;
        node.save();
    });

    this.args.onClose();
  }

  @action
  onCancel() {
    this.args.onClose();
    this.title = '';
  }

}
