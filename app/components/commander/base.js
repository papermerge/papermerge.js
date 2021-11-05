import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class BaseCommanderComponent extends Component {
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
