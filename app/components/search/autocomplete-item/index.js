import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class AutocompleteItemComponent extends Component {
  @action
  onClick() {
    this.args.onOpen(this.args.item);
  }
}
