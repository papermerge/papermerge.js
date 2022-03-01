import { action } from '@ember/object';
import Modifier from 'ember-modifier';
import { merge_nodes } from 'papermerge/utils/array';


export default class DraggableModifier extends Modifier {
  /*
    Modifier which will make element draggable.

    It performs following:

      1. Sets draggable attribute of the element to 'true'
      2. Listents to dragstart and dragend events

    Usage:

    {{draggable @model
      onDragendSuccess=@onDragendSuccess
      onDragendCancel=@onDragendCancel}}

    Notice that you need to pass as first argument either
    `models.document` or `models.folder` instance.
  */

  model = null;

  addEventListener() {
    this.element.addEventListener(
      'dragstart',
      this.onDragStart
    );
    this.element.addEventListener(
      'dragend',
      this.onDragEnd
    );
  }

  removeEventListener() {
    this.element.removeEventListener(
      'dragstart',
      this.onDragStart
    );
    this.element.removeEventListener(
      'dragend',
      this.onDragEnd
    );
  }

  // lifecycle hooks
  didReceiveArguments() {
    this.removeEventListener();
    this.addEventListener();
    this.element.setAttribute('draggable', true);
  }

  willDestroy() {
    this.removeEventListener();
  }

  @action
  onDragStart(event) {
    let data, nodes, canvas;

    this.model = this.args.positional[0];
    this.selected_nodes = this.args.named['selectedNodes'];

    // Merge model from which user started dragging
    // with rest of selected nodes (in case there are some)
    // into one single list of {id: <node_id>} objects.
    // Resulted list won't have any duplicates.
    nodes = merge_nodes(this.model.id, this.selected_nodes);

    data = {
      nodes: nodes,
      source_parent: {
        id: this.model.parent.get('id')
      }
    }

    canvas = this.get_drag_canvas(nodes.length);

    event.dataTransfer.setData(
      "application/x.node",
      JSON.stringify(data)
    );

    event.dataTransfer.setDragImage(canvas, 0, -15);
  }

  get_drag_canvas(count) {
    /*
      Returns a canvas with `Move ${count} item(s)` text on it.
    */
    let canvas = document.createElement("canvas"),
      ctx;

    canvas.width = 280;
    canvas.height = 120;
    ctx = canvas.getContext("2d");
    ctx.font = "18px Arial";

    ctx.fillText(`Move ${count} item(s)`, 10, 20);

    return canvas;
  }

  @action
  onDragEnd(event) {
    const ondragend_success = this.args.named['onDragendSuccess'];
    const ondragend_cancel = this.args.named['onDragendCancel'];

    if (event.dataTransfer.dropEffect === "move") {
      ondragend_success(this.model, this.selected_nodes);
    } else {
      ondragend_cancel(this.model, this.selected_nodes);
    }
  }
}
