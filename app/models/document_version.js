import Model, { attr, hasMany, belongsTo } from '@ember-data/model';


export default class DocumentVersionModel extends Model {
  @attr number; // document version number
  @attr size; // associated file size in bytes
  @attr page_count; // total page count
  @attr lang; // languate used for this page
  @attr short_description;
  @hasMany('pages') pages;
  @belongsTo('document') document;
}
