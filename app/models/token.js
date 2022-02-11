import Model, { attr } from '@ember-data/model';


class TokenModel extends Model {
  @attr expiry_hours;
  @attr expiry;
  @attr digest;
  @attr token;
  @attr created;
}

export default TokenModel;
