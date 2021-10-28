import Model, { attr, belongsTo } from '@ember-data/model';


class UserModel extends Model {
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
  @belongsTo('node') home_folder;
  @belongsTo('node') inbox_folder;

  changePassword(new_password) {
    const adapter = this.store.adapterFor('user');

    return adapter.changePassword(this, new_password);
  }
}

export default UserModel;
