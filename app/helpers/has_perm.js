import Helper from '@ember/component/helper';
import { service } from '@ember/service';


export default class extends Helper {

  @service current_user;

  compute([codename]) {
    return this.current_user.has_perm(codename);
  }
}
