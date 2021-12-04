import Component from '@glimmer/component';


export default class DualLinkToComponent extends Component {
  /*
    Like LinkTo component, but for dual panel mode

    Arguments:

      @node = can be a folder or a document
      @hint = can be either "left" or "right". It indicates where @node is
       positioned i.e. in which panel is current <DualLinkTo /> located at
       this very moment.
      @extranode - extra node, visually on opposite panel
      @extradoc - extra document on the opposite panel


      URL has one of following forms:

      Single panel modes:

        /nodes/<node_id> - opens commander single panel model, with <node_id>
          root folder/node
        /document/<doc_id> - opens viewer in single panel mode, with <doc_id>
          as current document

      Dual panel models:

        /nodes/<node_id>?extra_id=<extra_id>&extra_type=folder - opens dual
         panel mode. On left side commander is opened with <node_id> as root
         folder/node. On right panel there will be opened a commander with
         <extra_id> as root folder.

        /nodes/<node_id>?extra_id=<extradoc_id>&extra_type=doc - opens dual
         panel mode. On left side commander is opened with <node_id> as root
         folder. On right panel there will be opened a viewer with
         <extradoc_id> document opened.

        /document/<doc_id>?extra_id=<extranode_id>&extra_type=folder - opens dual
         panel mode. On left side document viewer is opened with <doc_id> as
         root document. On right panel there will be opened a commander with
         <extranode_id> as root folder.

        /document/<doc_id>?extra_id=<extradoc_id>&extra_type=doc - opens dual
         panel mode. On left side document viewer is opened with <doc_id> as
         root document. On right panel there will be opened a viewer with
         <extradoc_id> as document.
  */

  get route() {
    let node,
      extranode,
      extradoc,
      hint;

    hint = this.args.hint;
    node = this.args.node;
    extranode = this.args.extranode;
    extradoc = this.args.extradoc;

    if (hint == 'left') {
      if (node && node.get('nodeType') === 'document') {
        return 'authenticated.document';
      }

      if (node && node.get('nodeType') === 'folder') {
        return 'authenticated.nodes';
      }
    }

    // hint == 'right'
    if (extranode) {
      return 'authenticated.nodes';
    }

    if (extradoc) {
      return 'authenticated.document';
    }

    return 'authenticated.nodes';
  }

  get model() {
    let hint,
      node,
      extranode,
      extradoc;

    hint = this.args.hint;
    node = this.args.node;
    extranode = this.args.extranode;
    extradoc = this.args.extradoc;

    if (hint === 'left') {
      return node;
    }

    // hint right
    if (extradoc) {
      return extradoc;
    }

    return extranode;
  }

  get title() {
    let ret;

    ret = this.args.title || this.args.node.get('title');

    if (!ret) {
      return '';
    }

    if (ret.length > 24) {
      return `${ret.substring(0, 24)}...`;
    }

    return ret;
  }

  get query() {
    let node,
      extranode,
      extradoc,
      hint,
      result = {};

    node = this.args.node;
    extranode = this.args.extranode;
    extradoc = this.args.extradoc;
    hint = this.args.hint;

    if (this.args.query) {
      result = Object.assign(result, this.args.query);
    }

    if ((hint === 'left') && extranode) {
      return {
        'extra_id': extranode.get('id'),
        'extra_type': 'folder'
      };
    }

    if ((hint === 'left') && extradoc) {
      return {
        'extra_id': extradoc.get('id'),
        'extra_type': 'doc'
      };
    }

    if (hint === 'right' && node) {
      if (node.get('nodeType') === 'document') {
        return {
          'extra_id': node.get('id'),
          'extra_type': 'doc'
        }
      } else if (node.get('nodeType') === 'folder' ) {
        return {
          'extra_id': node.get('id'),
          'extra_type': 'folder'
        }
      }
    }

    return result;
  } // end of query

} // end of DualLinkToComponent
