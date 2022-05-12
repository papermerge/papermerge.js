import { service } from '@ember/service';
import BaseRoute from 'papermerge/routes/base';
import { TrackedArray } from 'tracked-built-ins';


export default class GroupsRoute extends BaseRoute {
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
    return this.store.query('group', { page: {
        number: params.page,
        size: params.size
      }
    });
  }

  setupController(controller, model) {
    let pages = new TrackedArray([]),
      pagination,
      number_of_pages,
      number,
      total_items_count = 0;

    super.setupController(controller, model);

    if (model && model.meta) {
      pagination = model.meta.pagination;
      total_items_count = pagination.count;
    }

    if (pagination) {
      number_of_pages = pagination.pages;

      for (let i=0; i < number_of_pages; i++ ) {
        number = i + 1;
        if (number == pagination.page) {
          pages.push({
            'number': number,
            'active': true
          });
        } else {
          pages.push({'number': number});
        }
      }
    }

    controller.set('pages', pages);
    controller.set('total_items_count', total_items_count);
    console.log(`total_items_count=${total_items_count}`);
  }
}
