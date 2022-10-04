import Model, { attr, hasMany } from '@ember-data/model';


class GroupModel extends Model {
  @attr name;
  @hasMany('permission', {async: true}) permissions;
  @attr created_at;
  @attr updated_at;
}

export default GroupModel;
