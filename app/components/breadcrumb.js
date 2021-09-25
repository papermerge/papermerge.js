import { A } from '@ember/array';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BreadcrumbComponent extends Component {
  @tracked path = A([]);

  @action
  change(node_id) {
  }
}