import Component from '@glimmer/component';
import Point from 'papermerge/utils/point';
import { action } from '@ember/object';
import { get_cursor_pos_within_element } from 'papermerge/utils/dom';


export default class ViewerThumbnailsComponent extends Component {

  @action
  onDragendCancel() {
  }

  @action
  onDragendSuccess() {
  }

  @action
  onDrop({event, element}) {
    let data,
      json_data,
      page_ids,
      original_pos,
      drop_pos,
      source_doc_id;

    event.preventDefault();
    data = event.dataTransfer.getData('application/x.page');
    if (!data) {
      console.warn('Accepts only application/x.page data');
      return;
    }
    json_data = JSON.parse(data);

    original_pos = json_data['original_pos']
    page_ids = json_data['pages'].map(page => page.id);
    source_doc_id = json_data['source_doc_id'];

    drop_pos = get_cursor_pos_within_element(
      element,
      new Point(event.clientX, event.clientY)
    );

    if (source_doc_id == this.args.doc.id) {
      // pages moved within same document
      this.args.onThumbnailsPositionChanged({
        original_pos, drop_pos, page_ids
      });
    } else {
      // pages moved to another document
      this.args.onIncomingPages({
        page_ids, drop_pos
      });
    }
  }

  @action
  onDragOver() {
  }

  @action
  onDragEnter() {
  }

  @action
  onDragLeave() {
  }
}
