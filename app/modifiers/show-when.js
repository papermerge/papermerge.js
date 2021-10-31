import { Modal } from 'bootstrap';
import { modifier } from 'ember-modifier';

export default modifier((element, [isDisplayed]) => {
  let modal;

  modal = Modal.getOrCreateInstance(element);

  if (isDisplayed) {
    modal.show();
  } else {
    modal.hide();
  }
});
