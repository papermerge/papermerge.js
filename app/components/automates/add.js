import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


class AddAutomateComponent extends Component {
  /*
  Component/Form to create new automate.
  */

  @service store;

  @action
  onSubmit() {
  }

}

export default AddAutomateComponent;