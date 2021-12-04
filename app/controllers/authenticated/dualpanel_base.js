import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';


export default class DualPanelBaseController extends Controller {

  @service currentUser;

  @tracked extranode_id = null;
  @tracked extradoc_id = null;

  queryParams = ['extranode_id', 'extradoc_id']

  @action
  async onPanelToggle() {
    let home_folder;

    if (this.extranode_id) {
      this.extranode_id = null;
    } else {
      home_folder = await this.currentUser.user.home_folder;
      this.extranode_id = home_folder.get('id');
    }
  }

  get dualpanel_mode() {
    return this.extranode_id || this.extradoc_id;
  }
}
