import Model, { attr, belongsTo } from '@ember-data/model';


class PermissionModel extends Model {
  @attr name;
  @attr codename;
  @belongsTo('content_type') content_type;
}

export default PermissionModel;
