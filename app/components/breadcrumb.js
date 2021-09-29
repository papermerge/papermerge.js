import { A } from '@ember/array';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BreadcrumbComponent extends Component {
  @tracked path = A([
    { id: 1, title: 'Some Folder 1' },
    { id: 2, title: 'Some Folder 2' },
  ]);

  @action
  change(node_id) {}
}
