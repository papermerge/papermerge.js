import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class NodeModel extends Model {
  @attr title;
  @attr tags;
  @attr model;
  @belongsTo('node', { async: true, inverse: 'children', polymorphic: true }) parent;
  @hasMany('node', {async: true, polymorphic: true, inverse: 'parent' }) children;

  get is_folder() {
    return this.type === 'folder' || this.model === 'folder';
  }

  get is_document() {
    return this.type === 'document' || this.model === 'document';
  }
}
