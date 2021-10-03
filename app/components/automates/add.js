import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


class AddAutomateComponent extends Component {
  /*
  Component/Form to create new automate.
  */

  @service store;
  @service router;

  @action
  onSubmit() {
    /*
    Creates new automate and redirects to automates
    index view.
    */
    let automate;

    automate = {
      name: this.name,
      match: this.match,
      dst_folder: this.dst_folder,
      is_case_sensitive: this.is_case_sensitive,
      matching_algorithm: this.matching_algorithm
    };

    this.store.createRecord(
      'automate',
      automate
    ).save();

    this.router.transitionTo('automates');
  }
}

export default AddAutomateComponent;