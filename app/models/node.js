import Model, { attr } from '@ember-data/model';

export default class NodeModel extends Model {
  @attr('string') title;
  @attr('string') type;
  @attr parent;

  get is_folder() {
    return this.type === "folder";
  }

  get is_document() {
    return this.type === "document";
  }
}
