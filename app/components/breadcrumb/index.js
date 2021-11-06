import Component from '@glimmer/component';


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

  get query() {
    if (this.args.extranode) {
      return {
        extranode_id: this.args.extranode.id
      }
    }

    return {};
  }
}
