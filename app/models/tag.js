import Model, { attr } from '@ember-data/model';


class TagModel extends Model {
  @attr name;
  @attr fg_color;
  @attr bg_color;
  @attr description;
  @attr pinned;
}

export default TagModel;
