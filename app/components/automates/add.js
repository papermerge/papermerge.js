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

  get dst_folder_options() {
    return [
      {'key': '---', 'value': '---'},
      {'key': '1', 'value': 'My Documents'},
      {'key': '2', 'value': 'XXX Some Folder'},
      {'key': '3', 'value': 'Invoices'}
    ]
  }

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