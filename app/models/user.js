import Model, { attr, belongsTo } from '@ember-data/model';
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
  @belongsTo('role') role;
  @belongsTo('folder') home_folder;
  @belongsTo('folder') inbox_folder;

  changePassword(new_password) {
    this.requests.changeUserPassword({
      user_id: this.id,
      password: new_password
    });
  }

}

export default UserModel;
