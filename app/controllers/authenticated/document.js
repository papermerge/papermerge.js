import { action } from '@ember/object';
import DualPanelBaseController from "./dualpanel_base";
import { service } from '@ember/service';


export default class DocumentController extends DualPanelBaseController {

  @service router;

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
        console.log('Closing right panel');
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

  @action
  onSwapPanels() {
    let document_id = this.router.currentRoute.params['document_id'],
      query_params;

    query_params = {
      'queryParams': {
        'extra_id': document_id,
        'extra_type': 'doc'
      }
    };

    if (this.extra_id && this.extra_type == 'folder') {
      this.router.transitionTo(
        'authenticated.nodes',
        this.extra_id,
        query_params
      );
    } else if (this.extra_id && this.extra_type == 'doc') {
      this.router.transitionTo(
        'authenticated.document',
        this.extra_id,
        query_params
      )
    }
  }

  @action
  onDuplicatePanel() {
    let document_id = this.router.currentRoute.params['document_id'],
      query_params;

    query_params = {
      'queryParams': {
        'extra_id': document_id,
        'extra_type': 'doc'
      }
    }
    if (this.extra_id) {
      this.router.transitionTo(
        'authenticated.document',
        document_id,
        query_params
      );
    }
  }
}
