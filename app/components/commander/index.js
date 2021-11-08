import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class CommanderComponent extends Component {
  // show create new folder modal dialog?
  @tracked show_new_folder_modal = false;
  // nodes are displayed as list or as grid?
  @tracked view_mode = 'list';

  @action
  openNewFolderModal() {
    this.show_new_folder_modal = true;
  }

  @action
  closeNewFolderModal() {
    this.show_new_folder_modal = false;
  }

  @action
  onViewModeChange(new_view_mode) {
    this.view_mode = new_view_mode;
  }
}
