import Model, { attr } from '@ember-data/model';


export default class PageModel extends Model {
  // page number; page numbering start with 1
  @attr number;
}
