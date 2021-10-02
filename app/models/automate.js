import Model, { attr, hasMany } from '@ember-data/model';


export default class AutomateModel extends Model {
  @attr name;
  @attr match;
  @attr matching_algorithm;
  @attr dst_folder;
  @attr('boolean') is_case_sensitive;
  @hasMany('tags') tags;
}
