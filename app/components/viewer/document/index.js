import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class ViewerDocumentComponent extends Component {
  @tracked scroll_to_page;
  @tracked thumbnails_visible = true;
  @tracked zoom_factor = 100;

  @action
  onThumbnailDblClick(page) {
    this.scroll_to_page = page;
  }

  @action
  onThumbnailsToggle() {
    this.thumbnails_visible = !this.thumbnails_visible;
  }

  @action
  onZoomIn() {
    if (this.zoom_factor < 300) {
      this.zoom_factor += 10;
    }
  }

  @action
  onZoomOut() {
    if (this.zoom_factor > 20) {
      this.zoom_factor -= 10;
    }
  }

  @action
  onZoomFit() {
    this.zoom_factor = 100;
  }
}