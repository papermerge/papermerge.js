import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class SelectComponent extends Component {
  @tracked value = null;

  @action
  onSelect(event) {
    console.log(`value=${event.target.value}`);
    this.value = event.target.value;
  }
}

export default SelectComponent;