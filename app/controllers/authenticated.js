import { action } from '@ember/object';
import Controller from '@ember/controller';
import { service } from '@ember/service';
import localStorage from 'papermerge/utils/localstorage';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';


export default class AuthenticatedController extends Controller {

  @localStorage expanded_sidebar = false;

  @service ws_inbox_refresh;
  @service router;
  @service requests;

  @tracked show_about_modal = false;
  @tracked papermerge_version_result;

  constructor() {
    super(...arguments);
    this.ws_inbox_refresh.addHandler(this.wsInboxRefreshHandler, this);
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

  @action
  onCloseAboutModal() {
    this.show_about_modal = false;
  }

  @action
  openAboutModal() {
    this.show_about_modal = true;
    this.getPapermergeVersion.perform();
  }

  @task *getPapermergeVersion() {
    this.papermerge_version_result = '';

    let result_1 = yield this.requests.getPapermergeVersion();
    let result_2 = yield result_1.json()

    this.papermerge_version_result = result_2['version'];
  }
}
