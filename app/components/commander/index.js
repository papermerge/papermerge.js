import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';


export default class CommanderComponent extends Component {
  /*
    Arguments:

    @node = current node/folder
    @extranode = extract node to display (on second panel)
    @hint = "left" | "right" indicates which of two sides
    is current panel displayed. @hint is "left" indicates that
    commander is displayed in left panel.
  */
  // show create new folder modal dialog?
  @tracked show_new_folder_modal = false;

  // show rename node modal dialog?
  @tracked show_rename_node_modal = false;

  @tracked show_confirm_deletion_modal = false;

  // nodes are displayed as list or as grid?
  @tracked view_mode = 'list';

  @tracked selected_nodes = A([]);

  @action
  openNewFolderModal() {
    this.show_new_folder_modal = true;
  }

  @action
  openRenameModal() {
    this.show_rename_node_modal = true;
  }

  @action
  closeRenameModal() {
    this.show_rename_node_modal = false;
    this.selected_nodes = A([]);
  }

  @action
  openConfirmDeletionModal() {
    this.show_confirm_deletion_modal = true;
  }

  @action
  closeConfirmDeletionModal() {
    this.show_confirm_deletion_modal = false;
    this.selected_nodes = A([]);
  }

  @action
  closeNewFolderModal() {
    this.show_new_folder_modal = false;
  }

  @action
  onViewModeChange(new_view_mode) {
    this.view_mode = new_view_mode;
  }

  @action
  onCheckboxChange({node, is_selected}) {
    /**
    Triggered whenever node's checkbox changes.

    `node` is an instance of Node model of whose
    selection state changed.

    `is_selected` - new selection state i.e. if user checked
    the checkbox then `is_selected` is true; if user unchecked
    the checkbox  then `is_selected` is false;
    */
    if (is_selected) {
      this.selected_nodes.pushObject(node);
    } else {
      this.selected_nodes.removeObject(node);
    }
  }
}
