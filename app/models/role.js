import Model, { attr, hasMany } from '@ember-data/model';

class RoleModel extends Model {
  @attr name;
  @hasMany('permission') permissions;
  @attr created_at;
  @attr updated_at;
}

export default RoleModel;
