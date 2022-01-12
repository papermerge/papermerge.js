import BaseRoute from 'papermerge/base/routing';
import { service } from '@ember/service';


export default class ApplicationRoute extends BaseRoute {
  @service currentUser;

  async model() {
    if (this.currentUser.isAuthenticated) {
      return this.currentUser.user.getHomeFolder();
    }
  }

  setupController(controller, model) {
    controller.set('home_folder', model);
  }
}
