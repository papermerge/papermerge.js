import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


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

  @action
  onSelectAll() {
    let nodes_arr = Array.from(
      document.getElementsByClassName('node')
    );

    this.select_nodes(nodes_arr);
  }

  @action
  onSelectFolders() {
    let nodes_arr = Array.from(
      document.querySelectorAll('.node.folder')
    );

    this.select_nodes(nodes_arr);
  }

  @action
  onSelectDocuments() {
    let nodes_arr = Array.from(
      document.querySelectorAll('.node.document')
    );

    this.select_nodes(nodes_arr);
  }

  @action
  onInvertSelection() {
    console.log('Invert Selection');
  }

  @action
  onSelectNone() {
    let nodes_arr = Array.from(
      document.getElementsByClassName('node')
    );

    this.deselect_all_nodes(nodes_arr);
  }

  @action
  onRename() {
    this.args.openRenameModal(
      this.args.selectedNodes[0]
    );
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
