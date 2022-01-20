import Service from '@ember/service';
import { service } from '@ember/service';


export default class Preferences extends Service {

  @service requests;

  constructor(owner, args) {
    super(owner, args);

    let that = this;

    this.preferences = [];

    this.requests.preferences().then(
      request => request.json()
    ).then(json_data => json_data.data).then(
      list_of_attrs => {
        that.preferences = list_of_attrs.map(attr => attr.attributes);
    });
  }

  get_value({key, default_value}) {
    let found_item;

    found_item = this.preferences.find(
      item => item.idendifier == key
    );

    if (found_item) {
      return found_item['value'];
    }

    return default_value;
  }
}