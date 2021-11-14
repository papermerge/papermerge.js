import Component from '@glimmer/component';


export default class DualLinkToComponent extends Component {
  /*
    Like LinkTo component, but for dual panel mode

    Arguments:

      @node - main node, which is visually located on left panel
      @extranode - extra node, visually on right panel
      @hint = can be either "left" "right". Indicates in which panel
      is current <DualLinkTo /> located at this very moment.

      URL has one of following forms:

      Single panel modes:

        /nodes/<node_id> - opens commander single panel model, with <node_id>
          root folder/node
        /documents/<node_id> - opens viewer in single panel mode, with <node_id>
          as current document/node

      Dual panel models:

        /nodes/<node_id>?extranode_id=<extranode_id> - opens dual panel mode. On left side
          commander is opened with <node_id> as root folder/node. On right panel
          there will be opened a commander or a viewer, depending on what node type is
          <extranode_id>.

        /documents/<node_id>?extranode_id=<extranode_id> - opens dual panel mode. On left side
          document viewer is opened with <node_id> as root document/node. On right panel
          there will be opened a commander or a viewer, depending on what node type is
          <extranode_id>.
  */

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
