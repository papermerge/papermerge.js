import BaseRoute from 'papermerge/base/routing';
import { inject as service } from '@ember/service';


export default class ApplicationRoute extends BaseRoute {
  @service currentUser;

  async model() {
    if (this.currentUser.isAuthenticated) {
      console.log("ApplicationRoute: current user is authenticated");
      return this.currentUser.user.home_folder;
    }
  }
}
