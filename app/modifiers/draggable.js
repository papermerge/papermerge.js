import { action } from '@ember/object';
import Modifier from 'ember-modifier';


export default class DraggableModifier extends Modifier {
  /* Usage:

    {{draggable @model
      onDragendSuccess=@onDragendSuccess
      onDragendCancel=@onDragendCancel}}
  */

  model = null;

  addEventListener() {
    this.element.addEventListener('dragstart', this.onDragStart);
    this.element.addEventListener('dragend', this.onDragEnd);
  }

  removeEventListener() {
    this.element.removeEventListener('dragstart', this.onDragStart);
    this.element.removeEventListener('dragend', this.onDragEnd);
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
    this.model = this.args.positional[0];
    event.dataTransfer.setData("application/x.node", this.model);
  }

  @action
  onDragEnd(event) {
    const ondragend_success = this.args.named['onDragendSuccess'];
    const ondragend_cancel = this.args.named['onDragendCancel'];

    if (!event.dropEffect) {
      ondragend_cancel(this.model);
    } else {
      ondragend_success(this.model);
    }
  }
}
