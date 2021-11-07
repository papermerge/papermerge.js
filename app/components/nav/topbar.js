import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class TopbarComponent extends Component {
  @service session;
  @service currentUser;

  @action
  logout() {
    this.session.invalidate();
  }
}
