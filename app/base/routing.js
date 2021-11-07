import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class BaseRoute extends Route {
  @service session;
  @service currentUser;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
    await this.currentUser.loadCurrentUser();
    if (this.currentUser.user) {
      await this.currentUser.user.home_folder;
    }
  }

  setupController() {
    super.setupController(...arguments);

    let app_controller = this.controllerFor('authenticated');

    this.currentUser.user.home_folder.then((home_folder) => {
      app_controller.set('home_folder', home_folder);
    });

  }
}
