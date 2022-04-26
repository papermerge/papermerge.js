import Component from '@glimmer/component';
import { action } from '@ember/object';



export default class NodeComponent extends Component {
  /**
   * Receives arguments:
   * `selectedNodes` - an array of currently selected nodes
   * `model` - current node's model
  */
  max_visible_tags = 3;

  get is_selected() {
    let model = this.args.model,
      nodes = this.args.selectedNodes;

    if (nodes.includes(model)) {
      return true;
    }

    return false;
  }

  get tags() {
    return this.args.model.tags.slice(
      0,
      this.max_visible_tags
    );
  }

  get more_than_max_visible_tags() {
    if (this.args.model.tags) {
      if (this.args.model.tags.length > this.max_visible_tags) {
        return true;
      }
    }

    return 0;
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

  @action
  onDragStart({event, model, items, canvas}) {
    let data;

    data = {
      nodes: items,
      source_parent: {
        id: model.parent.get('id')
      }
    }

    event.dataTransfer.setData(
      "application/x.node",
      JSON.stringify(data)
    );

    event.dataTransfer.setDragImage(canvas, 0, -15);
  }
}
