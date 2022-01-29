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
    this.select_div = undefined;
  }

  create_div() {
    if (!this.select_div) {
      this.select_div = this._create_selection_div(
        this.start_x,
        this.start_y
      );
    }
  }

  remove_div() {
    if (this.select_div) {
      this.select_div.remove();
      this.select_div = undefined;
    }
  }

  update(x, y) {
    let height, width, top, left;

    this.current_x = x;
    this.current_y = y;

    width = Math.abs(this.current_x - this.start_x);
    height = Math.abs(this.current_y - this.start_y);

    if (this.select_div) {

      if (this.current_y <  this.start_y) {
        this.select_div.top = `${this.current_y + 7}px`;
        top = this.current_y + 7;
      } else {
        this.select_div.top = `${this.start_y}px`;
        top = this.start_y;
      }
      if (this.current_x <  this.start_x) {
        this.select_div.left = `${this.current_x + 7}px`;
        left = this.current_x + 7;
      } else {
        this.select_div.left = `${this.start_x}px`;
        left = this.start_x;
      }
      this.select_div.width = `${width}px`;
      this.select_div.height = `${height}px`;
      console.log(`select_div.width = ${width}`);
      console.log(`select_div.height = ${height}`);
    }
  }

  _create_selection_div(x, y) {

    let div = document.createElement('div');

    div.setAttribute('id',  'ui-select');
    div.style.position = 'absolute';
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.style.width = '0px';
    div.style.height = '0px';

    this.parent.appendChild(div);

    return div;
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
    if (this.ui_select) {
      this.ui_select.update(event.clientX, event.clientY);
    }
  }

  @action
  onMouseUp() {
    this.ui_select.remove_div();
    this.ui_select = undefined;
  }

  @action
  onMouseDown(event) {

    this.ui_select = new UISelect(
      this.element,
      event.clientX,
      event.clientY
    );

    this.ui_select.create_div();
  }
}