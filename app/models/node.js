import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class NodeModel extends Model {
  @attr title;
  @attr model;
  @belongsTo('node', { inverse: 'descendants', polymorphic: true }) parent;
  @hasMany('node', { polymorphic: true }) descendants;

  get is_folder() {
    return this.type === 'folder' || this.model === 'folder';
  }

  get is_document() {
    return this.type === 'document' || this.model === 'document';
  }
}
