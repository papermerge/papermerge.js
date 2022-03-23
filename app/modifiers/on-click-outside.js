import { action } from '@ember/object';
import Modifier from 'ember-modifier';


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

  _init() {
    document.addEventListener('click', this.onClick);
  }

  _destroy() {
    document.removeEventListener('click', this.onClick);
  }

  didReceiveArguments() {
    this.on_click_user_handler = this.args.positional[0];
    this._init();
  }

  willDestroy() {
    this._destroy();
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
