import Component from '@glimmer/component';
import { group_perms_by_model } from 'papermerge/utils';



class PermissionsComponent extends Component {

  get permission_groups() {
    return group_perms_by_model(this.args.permissions);
  }
}

export default PermissionsComponent;
