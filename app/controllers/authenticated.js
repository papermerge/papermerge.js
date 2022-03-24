import { action } from '@ember/object';
import Controller from '@ember/controller';
import { service } from '@ember/service';
import localStorage from 'papermerge/utils/localstorage';


export default class AuthenticatedController extends Controller {

  @localStorage expanded_sidebar = false;
  @service ws_inbox_refresh;
  @service ws_nodes_move;
  @service router;

  constructor() {
    super(...arguments);
    this.ws_inbox_refresh.addHandler(this.wsInboxRefreshHandler, this);
    this.ws_nodes_move.addHandler(this.wsNodesMoveHandler, this);
  }

  wsInboxRefreshHandler() {
    this.router.refresh();
  }

  wsNodesMoveHandler(message) {
    if (message.type === 'nodesmove.tasksucceeded') {
      this.router.refresh();
    }
  }

  @action
  onSidebarToggle() {
    this.expanded_sidebar = !this.expanded_sidebar;
  }
}
