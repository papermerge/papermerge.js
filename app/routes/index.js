import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Node } from "../models/node";

export default class IndexRoute extends Route {
  @service store;

  async model() {
    let response = await fetch('/api/nodes.json');
    let { data } = await response.json();
    let ret;

    ret = data.map((model) => {
      let { id, type, attributes } = model;

      return this.store.createRecord('node',{ id, type, ...attributes });
    });

    return ret;
  }
}
