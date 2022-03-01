import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class ViewerDocumentComponent extends Component {
  @tracked scroll_to_page;

  @action
  onThumbnailDblClick(page) {
    this.scroll_to_page = page;
  }
}