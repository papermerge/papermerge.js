import { Modal } from 'bootstrap';
import { modifier } from 'ember-modifier';


export default modifier((element, positional, named) => {
  let modal, isDisplayed = positional[0];

  modal = Modal.getOrCreateInstance(element);

  if (isDisplayed) {
    modal.show();
  } else {
    modal.hide();
  }
}, {eager: false});
