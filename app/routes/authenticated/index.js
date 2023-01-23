import { service } from '@ember/service';
import BaseRoute from 'papermerge/routes/base';


export default class IndexRoute extends BaseRoute {
  /*
  The sole purpose of this route is to redirect user
  to 'home folder' when user try to access root url
  */
  @service currentUser;
  @service router;

  async model() {
    this.router.transitionTo(
      'authenticated.nodes',
      this.currentUser.user.home_folder.get('id')
    );
  }
}
