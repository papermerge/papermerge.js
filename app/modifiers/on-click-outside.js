import { action } from '@ember/object';
import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';


export default class OnClickOutsideModifier extends Modifier {
  /*
  Modifier which will trigger given handler if 'click' event occured
  outside of the element.

  Example:

  <SomeComponent {{on-click-outside this.onClickOutside}} />

  Whenever click event occurs outside <SomeComponent /> `this.onClickOutside`
  will be invoked. Handler is invoked without any arguments.
  */

  on_click_user_handler = null;

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, this.cleanup);
  }

  cleanup = () => {
    document.removeEventListener('click', this.onClick);
  }

  modify(element, positional, named) {
    this.on_click_user_handler = positional[0];
    document.addEventListener('click', this.onClick);
  }

  @action
  onClick(event) {
    let path;

    // composedPath() method of the Event interface returns the event's path
    // which is an array of the objects on which listeners will be invoked.
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath The
    if (event.composedPath) {
      path = event.composedPath();
    }

    if (path && !path.includes(this.element)) {
      if (this.on_click_user_handler) {
        this.on_click_user_handler();
      }
    }
  }
}
