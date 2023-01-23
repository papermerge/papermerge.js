import { action } from '@ember/object';
import Modifier from 'ember-modifier';


class ContextMenu {

  constructor(dom_element) {
    this._dom_el = dom_element;
  }

  show(x, y) {
    this.display = 'block';
    this.top = `${x}px`;
    this.left  = `${y}px`;
  }

  hide() {
    this.display = 'None';
  }

  toggle(x, y) {
    if (!this.is_visible()) {
      this.show(x, y);
    } else {
      this.hide();
    }
  }

  is_visible() {
    return this._dom_el.style.display == 'block';
  }

  set display(value) {
    if (!this._dom_el) {
      return;
    }
    this._dom_el.style.display = value;
  }

  set top(value) {
    if (!this._dom_el) {
      return;
    }
    this._dom_el.style.top = value;
  }

  set left(value) {
    if (!this._dom_el) {
      return;
    }
    this._dom_el.style.left = value;
  }
}


export default class ContextMenuModifier extends Modifier {

  context_menu = undefined;

  modify(element, positional, named) {
    let dom_el = element.querySelector('.context-menu');

    if (dom_el) {
      element.addEventListener('contextmenu', this.onContextMenu);
      element.addEventListener('click', this.onClick);
      this.context_menu = new ContextMenu(dom_el);
    } else {
      console.error(`.context-menu element not found`);
    }

  }

  @action
  onContextMenu(event) {
    event.preventDefault();

    if (this.context_menu) {
      this.context_menu.toggle(event.pageY, event.pageX);
    }
  }

  @action
  onClick() {
    this.hide();
  }

  hide() {
    if (this.context_menu) {
      this.context_menu.hide();
    }
  }
}
