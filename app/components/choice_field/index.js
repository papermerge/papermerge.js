import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class PreferenceChoiceFieldComponent extends Component {
  /*
  * Component for one preference of type "ChoiceField"
  *
  * Argument this.args.model is a dictionary with following fields:
  *   - section
  *   - name
  *   - identifier
  *   - default
  *   - value
  *   - verbose_name
  *   - help_text
  *   - additional_data:
  *       choices: [
  *         [
  *           key,
  *           value
  *         ],
  *         [
  *           key,
  *           value
  *         ],
  *         ...
  *     ]
  *   }
  */

  get name() {
    return this.args.model.name;
  }

  get choices() {
    return this.args.model.additional_data.choices;
  }

  get identifier() {
    return this.args.model.identifier;
  }

  @action
  onChange(event) {
    const new_value = event.target.value;
    this.args.onChange({
      identifier: this.identifier,
      value: new_value
    });
  }
}
