import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class ViewerThumbnailComponent extends Component {

  @action
  onDblClick() {
    this.args.onDblClick(this.args.page);
  }
}