import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class TagInputItemComponent extends Component {

  @action
  onRemoveTagItem() {
    this.args.onRemoveTagItem(this.args.index);
  }
}