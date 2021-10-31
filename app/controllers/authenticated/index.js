import { Modal } from 'bootstrap';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {

  @action
  newFolder(modal_elem_id) {
    let modal, dom_elem;

    dom_elem = document.getElementById(modal_elem_id);

    modal = new Modal(dom_elem, {});
    modal.show();
  }
}