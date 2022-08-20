import Component from '@glimmer/component';
import { action } from '@ember/object';

import { get_pos_within_siblings } from 'papermerge/utils/dom';
import {
  RWDataTransfer,
  APPLICATION_XPAGE
} from 'papermerge/utils/rw_data_transfer';


export default class ViewerThumbnailComponent extends Component {

  @action
  onDblClick() {
    this.args.onDblClick(this.args.page);
  }

  @action
  onCheckboxChange(event) {
    let is_checked = event.target.checked;

    this.args.onCheckboxChange({
      page: this.args.page,
      is_selected: is_checked
    });
  }

  @action
  onDragStart({event, model, items, canvas, element}) {
    let data, original_pos, rw_data;

    original_pos = get_pos_within_siblings(element);

    data = {
      pages: items,
      page: model,
      original_pos: original_pos,
      source_doc_id: this.args.doc.id,
      //element: element
    };

    element.classList.add('is-being-dragged');

    // data used during `drag` event
    rw_data = new RWDataTransfer({
      ro_data_transfer: event.dataTransfer
    });

    rw_data.set('original_pos', original_pos);
    rw_data.set('source_doc_id', this.args.doc.id);

    // data used during `drop` event
    event.dataTransfer.setData(
      APPLICATION_XPAGE,
      JSON.stringify(data)
    );

    event.dataTransfer.setDragImage(canvas, 0, -15);
  }

  get is_selected() {
    let page = this.args.page,
      selected_page_ids;

    if (!this.args.selectedPages) {
      return false;
    }

    selected_page_ids = this.args.selectedPages.map(
      page => page.id
    );

    if (selected_page_ids.includes(page.id)) {
      return true;
    }

    return false;
  }

  set is_selected(value) {

  }
}
