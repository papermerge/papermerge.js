import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';


export default class ContextMenuComponent extends Component {
  /*
  Arguments:
    `openNewFolderModal` - action invoked when new folder button
      is clicked
    `node` - current node i.e. current
      folder whose content is currenlty being displayed
    `selectedNodes` - array of selected nodes
  */
  @tracked download_in_progress = false;


  get one_node_selected() {
    return this.args.selectedNodes.length === 1;
  }

  get one_or_multiple_nodes_selected() {
    return this.args.selectedNodes.length >= 1;
  }

  get multiple_nodes_selected() {
    return this.args.selectedNodes.length > 1;
  }

  get show_move_menu_item() {
    /*
    ``move menu item`` is the menu for "moving"
    selection of nodes from current panel to the
    target panel.
    */
    let extra_id = this.args.extra_id,
      extra_type = this.args.extra_type,
      node = this.args.node;

    if (extra_type != 'folder') {
      // It does not make sense to display 'move'
      // menu item if other panel is document viewer as
      // you cannot move "one or multiple nodes" into
      // a document
      return false;
    }

    // other panel shouldn't have same id as current one
    return extra_id && node && extra_id != node.id;
  }

  @action
  onSelectAll() {
    let new_selection = Array.from(this.args.nodes);

    this.args.onSelectionChanged(new_selection);
  }

  @action
  onSelectFolders() {
    let new_selection;

    new_selection = this.args.nodes.filter(
      node => node.nodeType == 'folder'
    );
    this.args.onSelectionChanged(new_selection);
  }

  @action
  onSelectDocuments() {
    let new_selection;

    new_selection = this.args.nodes.filter(
      node => node.nodeType == 'document'
    );
    this.args.onSelectionChanged(new_selection);
  }

  @action
  onInvertSelection() {
    let new_selection, current_sel;

    current_sel = this.args.selectedNodes;

    new_selection = this.args.nodes.filter(node => {
      return !current_sel.includes(node);
    });

    this.args.onSelectionChanged(new_selection);
  }

  @action
  onSelectNone() {
    this.args.onSelectionChanged([]);
  }

  @action
  onRename() {
    this.args.openRenameModal(
      this.args.selectedNodes[0]
    );
  }

  @action
  onTags() {
    this.args.openTagsModal(
      this.args.selectedNodes
    );
  }

  @action
  onMoveMenuItem() {
    this.args.onMoveMenuItem(
      this.args.selectedNodes,
      this.args.extra_id,
    );
  }

  @action
  callbacktest() {
    console.log('callbacktest invoked');
    this.router.refresh();
  }

  @action
  async onDownloadNodes() {
    this.download_in_progress = true;
    await this.args.onDownloadNodes(
      this.args.selectedNodes
    );
    this.download_in_progress = false;
  }

  select_nodes(elements) {
    let input_el;

    elements.forEach(element => {
      input_el = element.querySelector('input');
      if (input_el && !input_el.checked) {
        input_el.click();
      }
    });
  }

  deselect_all_nodes(nodes_arr) {
    let input_el;

    nodes_arr.forEach(element => {
      input_el = element.querySelector('input');
      if (input_el && input_el.checked) {
        input_el.click();
      }
    });
  }
}
