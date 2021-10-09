import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


class PermissionsComponent extends Component {
  @service store;

  get permissions() {
    return this.args.permissions;
  }
}

export default PermissionsComponent;
