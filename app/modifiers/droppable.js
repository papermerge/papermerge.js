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
    let _onDrop = this.args.named['onDrop'], element;

    element = this.element;
    _onDrop({event, element});
  }

  @action
  onDragOver(event) {
    //const isNode = event.dataTransfer.types.includes("application/x.node");

    //event.preventDefault();
    //if (isNode) {
      //console.log(`dragging over a node`);
    //}
    let _onDragOver = this.args.named['onDragOver'], element;

    element = this.element;
    if (_onDragOver) {
      _onDragOver({event, element});
    }
  }

  @action
  onDragEnter(event) {
    let _onDragEnter = this.args.named['onDragEnter'],
      element;

    element = this.element;
    _onDragEnter({event, element});
  }

  @action
  onDragLeave(event) {
    let _onDragLeave = this.args.named['onDragLeave'],
      element;

    element = this.element;
    _onDragLeave({event, element});
  }
}
