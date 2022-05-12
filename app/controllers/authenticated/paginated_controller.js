import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked, TrackedArray } from 'tracked-built-ins';


export default class PaginatedController extends Controller {

  @tracked pages = new TrackedArray([]);
  @tracked total_items_count = 0;

  queryParams = ['page', 'size'];
  page = 1;
  size = 7;

  @action
  onDelete() {
    if (this.total_items_count) {
      this.total_items_count = this.total_items_count - 1;
    }
  }

  @action
  onCreate() {
    if (this.total_items_count) {
      this.total_items_count = this.total_items_count + 1;
    }
  }
}
