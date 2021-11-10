import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class NodeComponent extends Component {
  /**
   * Receives arguments:
   * `selectedNodes` - an array of currently selected nodes
   * `model` - current node's model
  */

  get is_selected() {
    let model = this.args.model,
      nodes = this.args.selectedNodes;

    if (nodes.includes(model)) {
      return true;
    }

    return false;
  }

  set is_selected(value) {
    // if this node is selected or not is determened
    // by parent component via this.args.selectedNodes
    // array
  }

  @action
  onCheckboxChange(event) {
    let is_checked = event.target.checked;

    // Notify parent componet that selection change.
    // Parent component will update array of selected Nodes
    this.args.onCheckboxChange({
      node: this.args.model,
      is_selected: is_checked
    });
  }
}
