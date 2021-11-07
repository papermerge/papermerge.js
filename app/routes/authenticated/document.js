import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class DocumentRoute extends Route {
  @service store;

  async model(params) {
    return this.store.findRecord('document', params.document_id);
  }
}
