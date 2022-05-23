import { action } from '@ember/object';
import DualPanelBaseController from "./dualpanel_base";
import { service } from '@ember/service';


export default class DocumentController extends DualPanelBaseController {

  @service router;
  @service store;

  @action
  onDuplicatePanel(hint) {
    let document_id = this.router.currentRoute.params['document_id'],
      query_params;

    if (hint === 'left') {
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
    } else { // hint == 'right'
      query_params = {
        'queryParams': {
          'extra_id': this.extra_id,
          'extra_type': this.extra_type
        }
      }

      if (this.extra_type == 'folder') {
        this.router.transitionTo(
          'authenticated.nodes',
          this.extra_id,
          query_params
        );
      } else {
        this.router.transitionTo(
          'authenticated.document',
          this.extra_id,
          query_params
        );
      } // this.extra_type
    }
  }
}
