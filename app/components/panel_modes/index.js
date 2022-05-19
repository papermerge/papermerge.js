import Component from '@glimmer/component';
import { service } from '@ember/service';


export default class PanelModesComponent extends Component {
  @service router;

  get are_not_same_panels() {
    /* Returns true if both panels are not same (non empty) values */
    let param, route_node_id, route;

    route = this.router.currentRoute;

    route_node_id = route.params.document_id || route.params.node_id;

    if (route_node_id && this.args.node) {
      return route_node_id !== this.args.node.get('id');
    }

    return true;
  }
}