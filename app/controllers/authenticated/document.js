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
    let home_folder,
      route,
      empty_query_params,
      extra_id,
      extra_type,
      doc_id;

    route = this.router.currentRoute;
    empty_query_params = {
      'queryParams': {}
    };
    doc_id = route.params.document_id;

    if (route.queryParams.extra_id) {
      extra_id = route.queryParams.extra_id;
      extra_type = route.queryParams.extra_type;
      if (hint === "left") {
        // user decided to close left panel
        if (extra_type === 'folder') {
          this.router.transitionTo(
            'authenticated.nodes',
            extra_id,
            empty_query_params
          );
        } else {
          this.router.transitionTo(
            'authenticated.document',
            doc_id,
            empty_query_params
          );
          this.extra_id = null;
          this.extra_type = null;
        }
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
