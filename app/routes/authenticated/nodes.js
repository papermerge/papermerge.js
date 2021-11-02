import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";


export default class FolderRoute extends Route {
  @service store;

  queryParams = ['extra'];
  @tracked extra = null;


  async model(params) {
    let response, adapter, query_params;


    query_params = this.paramsFor('authenticated.nodes');
    console.log(`query_params=${this.query_params}`);
    console.log(`extra=${this.extra}`);

    adapter = this.store.adapterFor('node');

    return adapter.findNode(params.node_id);
  }
}
