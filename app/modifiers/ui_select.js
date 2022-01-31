import { action } from '@ember/object';
import Modifier from 'ember-modifier';


class UISelect {
  /**
    Desktop like select
  **/

  constructor(parent_selector, x, y) {
    /***
      x, y coordinates where selection started.
      parent - dom parent element. Selection DOM element
      will be attached to parent and it's coordinates
      will be relative to the parent DOM.
    **/
    // x,y where selection started
    this.start_x = x;
    this.start_y = y;
    this.current_x = y;
    this.current_y = y;
    this.height = 0;
    this.width = 0;
    this.parent = parent_selector;
    this.select_div = document.getElementById('ui-select');
  }

  show(x, y) {
    this.select_div.style.visibility = 'visible';
    this.select_div.style.top = `${x}px`;
    this.select_div.style.left  = `${y}px`;
  }

  hide() {
    this.select_div.style.visibility = 'hidden';
  }

  update(x, y) {
    let height, width, top, left;

    this.current_x = x;
    this.current_y = y;

    width = Math.abs(this.current_x - this.start_x);
    height = Math.abs(this.current_y - this.start_y);

    if (this.select_div) {

      if (this.current_y <  this.start_y) {
        this.select_div.style.top = `${this.current_y + 7}px`;
        top = this.current_y + 7;
      } else {
        this.select_div.style.top = `${this.start_y}px`;
        top = this.start_y;
      }
      if (this.current_x <  this.start_x) {
        this.select_div.style.left = `${this.current_x + 7}px`;
        left = this.current_x + 7;
      } else {
        this.select_div.style.left = `${this.start_x}px`;
        left = this.start_x;
      }
      this.select_div.style.width = `${width}px`;
      this.select_div.style.height = `${height}px`;
    }
  }

}


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
    if (!event.buttons) {
      this.hide();
    } else if (this.ui_select) {
      this.ui_select.update(event.clientX, event.clientY);
    }
  }

  @action
  onMouseUp() {
    this.hide();
  }

  @action
  onMouseDown(event) {
    this.ui_select = new UISelect(
      this.element,
      event.clientX,
      event.clientY
    );

    this.ui_select.show(event.clientX, event.clientY);
  }

  hide() {
    if (this.ui_select) {
      this.ui_select.hide();
    }
  }
}
