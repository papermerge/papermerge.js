import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {

  @tracked show_new_folder = false;

  @action
  newFolder() {
    this.show_new_folder = true;
  }

  @action
  closeNewFolder() {
    this.show_new_folder = false;
  }
}
