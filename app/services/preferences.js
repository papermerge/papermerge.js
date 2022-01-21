import Service from '@ember/service';
import { service } from '@ember/service';


export default class Preferences extends Service {

  @service requests;
  @service store;

  get_value({key, default_value}) {
    let found_item, prefs;

    prefs = this.store.peekAll('preferences');

    found_item = prefs.filterBy('identifier',key);

    if (found_item && found_item.length == 1) {
      return found_item[0]['value'];
    }

    return default_value;
  }

  async load() {
    let that = this;

    this.requests.preferences().then(
      request => request.json()
    ).then(json_data => json_data.data).then(
      list_of_attrs => {
        that.store.push({
          data: list_of_attrs
        });
    });
  }
}