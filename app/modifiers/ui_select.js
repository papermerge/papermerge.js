import { action } from '@ember/object';
import Modifier from 'ember-modifier';


export default class UISelectModifier extends Modifier {

  ui_select = undefined; 

  addEventListener() {
    this.element.addEventListener('mousedown', this.onMouseDown);
    this.element.addEventListener('mouseup', this.onMouseUp);
    this.element.addEventListener('mousemove', this.onMouseMove);
  }

  removeEventListener() {
    this.element.removeEventListener('mousedown', this.onMouseDown);
    this.element.removeEventListener('mouseup', this.onMouseUp);
    this.element.removeEventListener('mousemove', this.onMouseMove);
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
  onMouseMove(event) {
    if (this.ui_select) {
      console.log('on mouse move');
    }
  }

  @action
  onMouseUp(event) {
    this.ui_select = false;
  }

  @action
  onMouseDown(event) {
    this.ui_select = true;
  }
}