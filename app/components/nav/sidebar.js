import Component from '@glimmer/component';
import { inject as service } from '@ember/service';


export default class SidebarComponent extends Component {
  @service router;

  get active() {
    /*
    Returns 'active' if current route name is one of following:

      * authenticated.nodes
      * authenticated.document

    'active' is used as css class name in component's template.
    */
    let route_name, active_routes;

    active_routes = [
      'authenticated.nodes',
      'authenticated.document',
    ]
    route_name = this.router.currentRoute.name;

    if (active_routes.includes(route_name)) {
      return 'active';
    }

    return '';
  }
}
