import { action } from '@ember/object';
import DualPanelBaseController from "./dualpanel_base";


export default class NodesController extends DualPanelBaseController {

  @action
  async onPanelToggle(hint) {
    /*
      hint is either "left" or "right" depending where
      the onPanelToggle originated from.
    */
    let home_folder;

    if (this.extra_id) {
      if (hint === "left") {
        // user decided to close left panel
        if (this.extra_type === 'folder') {
          this.replaceRoute('authenticated.nodes', this.extra_id);
        } else {
          this.replaceRoute('authenticated.document', this.extra_id);
        }
        this.extra_id = null;
        this.extra_type = null;
      } else if (hint === "right") {
        this.extra_id = null;
        this.extra_type = null;
      } else {
        throw `Unknown value for origin argument: ${origin}`;
      }
    } else {
      home_folder = await this.currentUser.user.home_folder;
      this.extra_id = home_folder.get('id');
      this.extra_type = 'folder';
    }
  }
}
