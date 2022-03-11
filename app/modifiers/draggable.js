import { action } from '@ember/object';
import Modifier from 'ember-modifier';
import { merge_items } from 'papermerge/utils/array';


export default class DraggableModifier extends Modifier {
  /*
    Modifier which will make element draggable.

    It performs following:

      1. Sets draggable attribute of the element to 'true'
      2. Listents to dragstart and dragend events

    Usage:

    {{draggable @model
      onDragStart=this.onDragStart
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
    let model,
      selected_items,
      _onDragStart,
      canvas,
      items,
      element;

    model = this.model = this.args.positional[0];
    selected_items = this.selected_items = this.args.named['selectedItems'];
    _onDragStart = this.args.named['onDragStart'];

    // Merge model from which user started dragging
    // with rest of selected items (in case there are some)
    // into one single list of {id: <item_id>} objects.
    // Resulted list won't have any duplicates.
    items = merge_items(model.id, selected_items);

    element = this.element;
    canvas = this.get_drag_canvas(items.length);

    _onDragStart({
      event,
      element,
      model,
      items,
      canvas
    });
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
      ondragend_success(this.model, this.selected_items);
    } else {
      ondragend_cancel(this.model, this.selected_items);
    }
  }
}
