import { A } from '@ember/array';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class BaseBreadcrumbComponent extends Component {

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

  get query() {
    if (this.args.extranode) {
      return {
        extranode_id: this.args.extranode.id
      }
    }

    return {};
  }
}
