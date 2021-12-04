import { action } from '@ember/object';
import DualPanelBaseController from "./dualpanel_base";


export default class DocumentController extends DualPanelBaseController {

  @action
  async onPanelToggle(origin) {
    /*
      origin is either "document" or "nodes" depending where
      the onPanelToggle originated from.
    */
    let home_folder;

    if (this.extranode_id) {
      /*
        Here we have document viewer as main panel (left) and nodes panel as
        extra (on the right).
      */
      if (origin === "document") {
        // user decided to close document panel
        this.replaceRoute('authenticated.nodes', this.extranode_id);
        this.extranode_id = null;
      } else if (origin === "nodes") {
        // User decided to close nodes extra panel.
        // He/She decided to view only the document
        this.extranode_id = null;
      } else {
        throw `Unknown value for origin argument: ${origin}`;
      }
    } else {
      home_folder = await this.currentUser.user.home_folder;
      this.extranode_id = home_folder.get('id');
    }
  }

}
