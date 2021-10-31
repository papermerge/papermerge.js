import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {

  @tracked show_new_folder_modal = false;

  @action
  openNewFolderModal() {
    this.show_new_folder_modal = true;
  }

  @action
  closeNewFolderModal() {
    this.show_new_folder_modal = false;
  }
}
