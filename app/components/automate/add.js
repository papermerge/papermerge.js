import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

class AddAutomateComponent extends Component {
  /*
  Form like component to create new automate.
  */

  @service store;
  @service router;

  @tracked dst_folder;
  @tracked name;
  @tracked match;
  @tracked is_case_sensitive = false;
  @tracked matching_alg;

  get dst_folder_options() {
    return [
      { key: '---', value: '---' },
      { key: '1', value: 'My Documents' },
      { key: '2', value: 'XXX Some Folder' },
      { key: '3', value: 'Invoices' },
    ];
  }

  get matching_alg_options() {
    return [
      { key: '---', value: '---' },
      { key: '1', value: 'Any' },
      { key: '2', value: 'All' },
      { key: '3', value: 'Literal' },
      { key: '4', value: 'Regular Expression' },
    ];
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
      matching_algorithm: this.matching_alg,
    };

    this.store.createRecord('automate', automate).save();

    this.router.transitionTo('authenticated.automates');
  }

  @action
  onChangeDstFolder(event) {
    this.dst_folder = event.target.value;
  }

  @action
  onChangeMatchingAlg(event) {
    this.matching_alg = event.target.value;
  }
}

export default AddAutomateComponent;
