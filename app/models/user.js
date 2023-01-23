import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { service } from '@ember/service';


class UserModel extends Model {

  @service requests;

  @attr is_me;
  @attr username;
  @attr email;
  @attr first_name;
  @attr last_name;
  @attr is_active;
  @attr is_staff;
  @attr is_superuser;
  @attr date_joined;
  @attr created_at;
  @attr updated_at;
  @attr perm_codenames;

  @belongsTo('folder', {async: true, inverse: null}) home_folder;
  @belongsTo('folder', {async: true, inverse: null}) inbox_folder;
  @hasMany('group', {async: true, inverse: null}) groups;

  changePassword(new_password) {
    this.requests.changeUserPassword({
      user_id: this.id,
      password: new_password
    });
  }

  has_perm(codename) {
    let codename_idx;

    if (!this.perm_codenames) {
      return this.is_superuser;
    }

    codename_idx = this.perm_codenames.findIndex(
      (p) => p == codename
    );

    return codename_idx > -1 || this.is_superuser;
  }

}

export default UserModel;
