import { service } from '@ember/service';
import BaseRoute from 'papermerge/routes/base';
import { setup_pages } from './utils';


export default class GroupsRoute extends BaseRoute {
  @service store;
  @service router;

  queryParams = {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    }
  }

  async model(params) {
    let that = this;

    return this.store.query('group', { page: {
        number: params.page,
        size: params.size
      }
    }).catch(function(){
      // in case we query server for a ``page``
      // which does not exist - 404 will be returned.
      // In such case, just redirect to first page.
      that.transitionTo(
        'authenticated.groups',
        {
           queryParams: {'page': 1}
        }
      );
    });
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    controller.set(
      'pages', setup_pages(model)
    );
  }
}
