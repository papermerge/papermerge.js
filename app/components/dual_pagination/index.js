import Component from '@glimmer/component';
import { service } from '@ember/service';


export default class DualPaginationComponent extends Component {
  /*
  Pagination for dual panel commander.

  @pages - an array like [{'number': 1, 'active': false}, ...]
  @hint - string - 'left' | 'right'
  */

  @service router;

  get more_than_one_page() {
    return this.args.pages && this.args.pages.length > 1;
  }

  get model_id() {
    let route = this.router.currentRoute;

    if (this.args.hint == 'left') {
      return route.params.node_id;
    }

    return route.queryParams.extra_id;
  }

}
