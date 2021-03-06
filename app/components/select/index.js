import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


class SelectComponent extends Component {
  @tracked value;

  @action
  onChange(event) {
    this.args.onChange(event);
  }
}

export default SelectComponent;
