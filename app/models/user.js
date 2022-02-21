import Model, { attr, belongsTo } from '@ember-data/model';


class UserModel extends Model {
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
    const adapter = this.store.adapterFor('user');

    return adapter.changePassword(this, new_password);
  }

  async getHomeFolder() {
    let home_id, adapter;

    adapter = this.store.adapterFor('node');
    home_id = this.home_folder.get('id');

    return adapter.getFolder(home_id);
  }

  async getInboxFolder() {
    let inbox_id, adapter;

    adapter = this.store.adapterFor('node');
    inbox_id = this.inbox_folder.get('id');

    return adapter.getFolder(inbox_id);
  }
}

export default UserModel;
