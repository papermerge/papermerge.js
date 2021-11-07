import Component from '@glimmer/component';
import { inject as service } from '@ember/service';


export default class SidebarComponent extends Component {
  @service session;
  @service currentUser;
  @service router;

  get home_id() {
    return 75;
  }

  get active() {
    /*
    Returns "active" for "authenticated.nodes" route regardless
    of current node ID.

    "active" is used as css class name in component's template.
    */
    let route_name;

    route_name = this.router.currentRoute.name;

    if (route_name === "authenticated.nodes") {
      return "active";
    }

    return "";
  }
}
