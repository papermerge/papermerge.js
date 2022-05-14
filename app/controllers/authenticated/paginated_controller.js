import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked, TrackedArray } from 'tracked-built-ins';
import { service } from '@ember/service';


export default class PaginatedController extends Controller {

  // pages attribute is updated in ``setupController`` of the ``route``
  @tracked pages = new TrackedArray([]);

  @service router;

  queryParams = ['page', 'size'];
  page = 1;
  size = 7;

  @action
  onDelete() {
    this.router.refresh();
  }

  @action
  onCreate() {
    this.router.refresh();
  }
}
