import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class BaseRoute extends Route {
  @service session;
  @service store;
  @service currentUser;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');

    await this.currentUser.loadCurrentUser();

    if (this.currentUser.user) {
      return this.currentUser.user.getHomeFolder();
    }
  }

  async setupController() {
    super.setupController(...arguments);
    let app_controller = this.controllerFor('authenticated'),
      home_folder,
      inbox_folder;

    home_folder = await this.currentUser.user.getHomeFolder();
    inbox_folder = await this.currentUser.user.getInboxFolder();

    app_controller.set('home_folder', home_folder);
    app_controller.set('inbox_folder', inbox_folder);
  }
}
