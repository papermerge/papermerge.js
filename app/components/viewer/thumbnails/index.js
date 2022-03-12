import Component from '@glimmer/component';
import Point from 'papermerge/utils/point';
import { get_cursor_pos_within_element } from 'papermerge/utils/dom';


export default class ViewerThumbnailsComponent extends Component {

  onDragendCancel() {
  }

  onDragendSuccess() {
  }

  onDrop({event, element}) {
    let data, json_data, page_ids, original_pos, drop_pos;

    console.log(`posX=${event.clientX} posY=${event.clientY}`);
    event.preventDefault();
    data = event.dataTransfer.getData('application/x.page');
    json_data = JSON.parse(data);
    original_pos = json_data['original_pos']
    page_ids = json_data['pages'].map(page => page.id);

    drop_pos = get_cursor_pos_within_element(
      element,
      new Point(event.clientX, event.clientY)
    )
    console.log(`Thumbnails received: dropped page_ids=${page_ids}`);
    console.log(`original position=${original_pos}`);
    console.log(`drop position=${drop_pos}`);
  }

  onDragOver() {
  }

  onDragEnter() {
  }

  onDragLeave() {
  }
}
