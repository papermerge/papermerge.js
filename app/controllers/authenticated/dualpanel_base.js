import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';


export default class DualPanelBaseController extends Controller {

  @service currentUser;

  @tracked extra_id = null;
  @tracked extra_type = null; // can be either 'doc' or 'node'

  queryParams = ['extra_id', 'extra_type']

  get dualpanel_mode() {
    return this.extra_id;
  }
}
