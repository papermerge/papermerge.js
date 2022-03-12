import Component from '@glimmer/component';
import { action } from '@ember/object';

import { get_pos_within_siblings } from 'papermerge/utils/dom';


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
    let data, original_pos;

    original_pos = get_pos_within_siblings(element);

    console.log(`OnDragStart: original_pos = ${original_pos}`);
    data = {
      pages: items,
      page: model,
      original_pos: original_pos
    };

    event.dataTransfer.setData(
      'application/x.page',
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
