import { action } from '@ember/object';
import Modifier from 'ember-modifier';


class UISelect {
  /**
    Desktop like select
  **/

  constructor(parent_selector) {
    /***
      x, y coordinates where selection started.
      parent - dom parent element. Selection DOM element
      will be attached to parent and it's coordinates
      will be relative to the parent DOM.
    **/
    // x,y where selection started
    this.start_x = 0;
    this.start_y = 0;
    this.current_x = 0;
    this.current_y = 0;
    this.parent = parent_selector;
    this.select_div = document.getElementById('ui-select');
  }

  init(x, y) {
    this.start_x = x;
    this.start_y = y;
  }

  show(x, y) {
    this.visibility = 'visible';
    this.top = `${x}px`;
    this.left  = `${y}px`;
  }

  hide() {
    this.visibility = 'hidden';
  }

  update(x, y) {
    let height, width;


    this.show(x, y);
    this.current_x = x;
    this.current_y = y;

    width = Math.abs(this.current_x - this.start_x);
    height = Math.abs(this.current_y - this.start_y);

    if (this.select_div) {

      if (this.current_y <  this.start_y) {
        this.top = `${this.current_y + 7}px`;
      } else {
        this.top = `${this.start_y}px`;
      }
      if (this.current_x <  this.start_x) {
        this.left = `${this.current_x + 7}px`;
      } else {
        this.left = `${this.start_x}px`;
      }
      this.width = `${width}px`;
      this.height = `${height}px`;
    }
  }

  set width(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.width = value;
  }

  set height(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.height = value;
  }

  set top(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.top = value;
  }

  set left(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.left = value;
  }

  set visibility(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.visibility = value;
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

    this.ui_select = new UISelect(this.element);
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
    this.ui_select.init(event.clientX, event.clientY);
  }

  hide() {
    if (this.ui_select) {
      this.ui_select.hide();
    }
  }
}
