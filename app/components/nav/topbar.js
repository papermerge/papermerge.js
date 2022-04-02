import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { base_url } from 'papermerge/utils/host';


export default class TopbarComponent extends Component {
  @service session;
  @service currentUser;

  @action
  logout() {
    this.session.invalidate();
  }

  @action
  onSidebarToggle() {
    this.args.onSidebarToggle();
  }

  get rest_api_url() {
    return base_url();
  }
}
