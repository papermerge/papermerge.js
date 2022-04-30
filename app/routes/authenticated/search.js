import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class SearchRoute extends Route {
  @service requests;

  queryParams = {
    tags: {
      refreshModel: true
    }
  };

  async model(params) {
    let response = await this.requests.search({tags: params.tags});
    let data = await response.json();

    return data;
  }
}
