import { action } from '@ember/object';
import Modifier from 'ember-modifier';


export default class DrappableModifier extends Modifier {

  modify(element, positional, named) {
    element.addEventListener('drop', this.onDrop);
    element.addEventListener('dragover', this.onDragOver);
    element.addEventListener('dragenter', this.onDragEnter);
    element.addEventListener('dragleave', this.onDragLeave);
  }

  @action
  onDrop(event) {
    let _onDrop = this.args.named['onDrop'], element;
    element = this.element;
    _onDrop({event, element});
  }

  @action
  onDragOver(event) {
    let _onDragOver = this.args.named['onDragOver'], element;

    // Important!
    // When removed caused file drop feature to break!
    event.preventDefault();

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
