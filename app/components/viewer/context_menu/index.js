import Component from '@glimmer/component';


export default class ViewerContextMenuComponent extends Component {

  get one_or_multiple_pages_selected() {
    return this.args.selectedPages.length >= 1;
  }

  get show_extract_item() {
    /*
    ``extract menu item`` is the menu for "moving"
    selection of pages from current document
    into target folder. Note that target node
    must be a folder!
    */
    let extra_id = this.args.extra_id,
      extra_type = this.args.extra_type,
      node = this.args.node;

    if (extra_type && extra_type == 'folder') {
      // target node must be a folder
      return true;
    }

    return false;
  }

  get show_move_item() {
    /*
    ``move menu item`` is the menu for "moving"
    selection of pages from current document
    into target document. Note that target
    must be a document!
    */

    let extra_id = this.args.extra_id,
      extra_type = this.args.extra_type,
      doc = this.args.doc;

    if (extra_type && extra_type == 'doc') {
      return true;
    }

    return false;
  }

  get show_merge_item() {
    return this.show_move_item;
  }

}
