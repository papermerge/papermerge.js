import Model, { attr } from '@ember-data/model';


export default class NodeModel extends Model {
  @attr title;
  @attr parent;
  @attr type;
}