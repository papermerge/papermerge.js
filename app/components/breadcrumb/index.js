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
        extra_id: this.args.extranode.id,
        extra_type: 'folder'
      }
    } else if (this.args.extradoc) {
      return {
        extra_id: this.args.extradoc.id,
        extra_type: 'doc'
      }
    }

    return {};
  }
}
