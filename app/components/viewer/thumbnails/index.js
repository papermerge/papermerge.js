import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class ViewerThumbnailsComponent extends Component {
  @action
  onDragendCancel() {
  }

  @action
  onDragendSuccess() {
  }

  @action
  onDrop({event, element}) {
    let data, json_data, page_ids;

    event.preventDefault();
    data = event.dataTransfer.getData('application/x.page');
    json_data = JSON.parse(data);
    page_ids = json_data['pages'].map(page => page.id);
    console.log(`Thumbnails received: dropped page_ids=${page_ids}`);
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
