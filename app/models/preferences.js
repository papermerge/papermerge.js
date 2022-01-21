import Model, { attr } from '@ember-data/model';


export default class PreferenceModel extends Model {
  @attr name;
  @attr value;
  @attr section;
  @attr identifier;
}