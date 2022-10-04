import Model, { attr, hasMany } from '@ember-data/model';


class ContentTypeModel extends Model {
  @attr model;
  @hasMany('permission', {async: true}) permissions;
}

export default ContentTypeModel;
