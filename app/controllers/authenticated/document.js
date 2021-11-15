import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';


export default class DocumentController extends Controller {

  @service currentUser;
  @tracked extranode_id = null;
  @tracked extradoc_id = null;
  queryParams = ['extranode_id', 'extradoc_id']

  @action
  onPanelToggle() {

    if (this.extranode_id) {
      this.extranode_id = null;
    } else {
      // TODO: get home folder ID from this.currentUser;
      this.extranode_id = 75;
    }
  }
}
