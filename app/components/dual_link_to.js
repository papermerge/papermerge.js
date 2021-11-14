import Component from '@glimmer/component';


export default class DualLinkToComponent extends Component {

  get route() {
    let node,
      hint;

    hint = this.args.hint;
    node = this.args.node;
    if (hint == 'left') {
      if (node && node.get('nodeType') === 'document') {
        return 'authenticated.document';
      }

      if (node && node.get('nodeType') === 'folder') {
        return 'authenticated.nodes';
      }
    }

    return 'authenticated.nodes';
  }

  get model() {
    if (this.args.hint == 'left') {
      return this.args.node;
    }

    return this.args.extranode;
  }

  get title() {
    return this.args.node.get('title');
  }

  get query() {
    let node,
      extranode,
      hint;

    node = this.args.node;
    extranode = this.args.extranode;
    hint = this.args.hint;

    if ((hint === 'left') && extranode) {
      return {
        'extranode_id': extranode.get('id')
      };
    }

    if (hint === 'right' && node) {
      return {
        'extranode_id': node.get('id')
      }
    }

    return {};
  } // end of query

} // end of DualLinkToComponent
