import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class NodeComponent extends Component {
  @tracked is_selected = false;

  @action
  onCheckboxChange(event) {
    let is_checked = event.target.checked;

    this.is_selected = is_checked;

    this.args.onCheckboxChange({
      node: this.args.model,
      is_selected: is_checked
    });
  }
}
