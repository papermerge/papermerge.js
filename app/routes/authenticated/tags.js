import { service } from '@ember/service';
import BaseRoute from 'papermerge/routes/base';


export default class TagsRoute extends BaseRoute {

  @service store;

  queryParams = {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    }
  }

  async model(params) {
    return this.store.query('tag', { page: {
        number: params.page,
        size: params.size
      }
    });
  }
}
