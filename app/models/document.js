import Model, { attr } from '@ember-data/model';

export default class DocumentModel extends Model {
  @attr title;
  @attr image;
}