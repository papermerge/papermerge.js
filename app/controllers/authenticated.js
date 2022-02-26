import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';


export default class AuthenticatedController extends Controller {

  // sidebar expanded ?
  @tracked expanded = true;
  @service ws_inbox_refresh;
  @service router;

  constructor() {
    super(...arguments);
    this.ws_inbox_refresh.addHandler(this.wsInboxRefreshHandler, this);
  }

  wsInboxRefreshHandler() {
    this.router.refresh();
  }

  @action
  onSidebarToggle() {
    this.expanded = !this.expanded;
  }
}