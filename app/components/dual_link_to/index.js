import Component from '@glimmer/component';

import { route_name as _route_name } from "./utils";
import { model_obj as _model_obj } from "./utils";
import { query_dict as _query_dict } from "./utils";


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

        /document/<doc_id>?extra_id=<extranode_id>&extra_type=folder - opens
         dual panel mode. On left side document viewer is opened with
         <doc_id> as root document. On right panel there will be opened a
         commander with <extranode_id> as root folder.

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

    return _route_name({
      node, hint, extranode, extradoc
    });
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

    return _model_obj({
      node, hint, extranode, extradoc
    });
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
      q;

    node = this.args.node;
    extranode = this.args.extranode;
    extradoc = this.args.extradoc;
    hint = this.args.hint;
    q = this.args.query

    return _query_dict({
      node: node,
      extranode: extranode,
      extradoc: extradoc,
      hint: hint,
      query: q
    });
  } // end of query

} // end of DualLinkToComponent
