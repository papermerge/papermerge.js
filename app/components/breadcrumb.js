import { A } from '@ember/array';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class BreadcrumbComponent extends Component {

  get nodes() {
    let current,
      _nodes = [];

    current = this.args.node;

    while (current && current.get('id')) {
      _nodes.push(current);
      current = current.get('parent');
    }

    return _nodes.reverse();
  }

}
