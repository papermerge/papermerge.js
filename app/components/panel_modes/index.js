import Component from '@glimmer/component';
import { service } from '@ember/service';


export default class PanelModesComponent extends Component {
  @service router;

  get are_not_same_panels() {
    /* Returns true if both panels are not same (non empty) values */
    let param, query_param, route;

    route = this.router.currentRoute;

    param = route.params.document_id || route.params.node_id;
    query_param = route.queryParams.extra_id;

    if (param && query_param) {
      return param !== query_param;
    }

    return true;
  }
}