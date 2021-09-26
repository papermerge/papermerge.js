import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class NodeModel extends Model {
  @attr title;
  @hasMany('node',  { polymorphic: true }) children;
  @belongsTo('node', { inverse: 'children' }) parent;

  get is_folder() {
    return this.type == "folder";
  }

  get is_document() {
    return this.type == "document";
  }
}
