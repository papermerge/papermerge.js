import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


class PermissionsComponent extends Component {
  @service store;
}

export default PermissionsComponent;
