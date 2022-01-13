import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class IndexRoute extends Route {
  @service store;
  @service session;
  @service router;
  @service currentUser;

  async beforeModel(transition) {
    /* Redirects to user's home folder
    */
    let that = this;
    this.session.requireAuthentication(transition, 'login');
    await this.currentUser.loadCurrentUser();
    this.currentUser.user.getHomeFolder().then((home_folder) => {
      that.router.replaceWith("authenticated.nodes", home_folder.id);
    });
  }

}
