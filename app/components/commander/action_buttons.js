import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class ActionButtonsComponent extends Component {
  /*
  Arguments:
    `openNewFolderModal` - action invoked when new folder button
      is clicked
    `node` - current node i.e. current
      folder whose content is currenlty being displayed
    `selectedNodes` - array of selected nodes
  */
  get one_node_selected() {
    return this.args.selectedNodes.length === 1;
  }

  get multiple_nodes_selected() {
    return this.args.selectedNodes.length > 1;
  }

  @action
  onRename() {
    this.args.openRenameModal(
      this.args.selectedNodes[0]
    );
  }

  @action
  onDownloadNodes() {
    this.args.onDownloadNodes(
      this.args.selectedNodes
    );
  }
}
