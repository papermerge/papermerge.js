import DualPanelBaseController from "./dualpanel_base";
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import { TrackedObject } from 'tracked-built-ins';


export default class DocumentController extends DualPanelBaseController {

  @service router;
  @service store;

  @task({ drop: true })
  *onDuplicatePanel(hint) {
    let document_id = this.router.currentRoute.params['document_id'],
      doc,
      last_version,
      pages_with_url;

    if (hint === 'left') {
      if (this.extra_id) {

        this.extra_id = document_id;
        this.extra_type = 'doc';

        // open viewer in secondary panel
        doc = yield this.store.findRecord(
          'document',
          document_id
        );

        last_version = doc.last_version;

        pages_with_url = last_version.pages.map(
          (page) => this.requests.loadImage.perform(
            page,
            'image/svg+xml',
            'force-cache'
          )
        );

        this.extra = new TrackedObject({
          doc: doc,
          document_versions: doc.versions,
          last_document_version: doc.last_version,
          pages: pages_with_url
        });

        // save extra id/extra type for 'other' controller:
        // if we are now in 'nodes controller',then 'other' is 'documents controller'
        // if we are now in 'documents controller, then 'other' is 'nodes controller'
        localStorage.setItem('extra_id', doc.id);
        localStorage.setItem('extra_type', 'doc');
      }
    } else { // hint == 'right'
      if (this.extra_type == 'folder') {

        this.router.transitionTo(
          'authenticated.nodes',
          this.extra_id
        );
      } else {
        this.router.transitionTo(
          'authenticated.document',
          this.extra_id
        );
      } // this.extra_type
    }
  }
}
