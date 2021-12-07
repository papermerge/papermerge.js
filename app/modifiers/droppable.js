import { action } from '@ember/object';
import Modifier from 'ember-modifier';


export default class DrappableModifier extends Modifier {

  addEventListener() {
    this.element.addEventListener('drop', this.onDrop);
    this.element.addEventListener('dragover', this.onDragOver);
    this.element.addEventListener('dragenter', this.onDragEnter);
    this.element.addEventListener('dragleave', this.onDragLeave);
  }

  removeEventListener() {
    this.element.removeEventListener('drop', this.onDrop);
    this.element.removeEventListener('dragover', this.onDragOver);
    this.element.removeEventListener('dragenter', this.onDragEnter);
    this.element.removeEventListener('dragleave', this.onDragLeave);
  }

  // lifecycle hooks
  didReceiveArguments() {
    this.removeEventListener();
    this.addEventListener();
  }

  willDestroy() {
    this.removeEventListener();
  }

  @action
  onDrop(event) {
    let data;
    const isNode = event.dataTransfer.types.includes("application/x.node");
    const callback = this.args.named['onDrop'];

    event.preventDefault();
    this.element.classList.remove('droparea');
    if (isNode && callback) {
      data = event.dataTransfer.getData('application/x.node');
      callback(JSON.parse(data));
    }
  }

  @action
  onDragOver(event) {
    const isNode = event.dataTransfer.types.includes("application/x.node");

    event.preventDefault();
    if (isNode) {
      //console.log(`dragging over a node`);
    }
  }

  @action
  onDragEnter(event) {
    event.preventDefault();
    this.element.classList.add('droparea');
  }

  @action
  onDragLeave(event) {
    event.preventDefault();
    this.element.classList.remove('droparea');
  }
}
