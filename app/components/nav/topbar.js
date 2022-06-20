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

  get show_first_divider() {
    let show_prefs = this.currentUser.has_perm('userpreferencemodel_view'),
      show_authtokens = this.currentUser.has_perm('authtoken_view');

    // if either 'preferences' menu item is visible or
    // 'authtoken' menu item is visible, then it makes sense
    // to show devider (positioned right after mentioned menu items);
    // otherwise it does not make sense to show the divider.
    return show_prefs || show_authtokens;
  }
}
