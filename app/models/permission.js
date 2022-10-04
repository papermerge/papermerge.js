import Model, { attr, belongsTo } from '@ember-data/model';

class PermissionModel extends Model {
  @attr name;
  @attr codename;
  @belongsTo('content-type', {async: true}) content_type;
}

export default PermissionModel;
