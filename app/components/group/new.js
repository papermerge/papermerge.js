import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';


export default class NewGroupComponent extends Component {
  @service store;
  @tracked form_visible = false;
  @tracked new_name = '';

  @action
  onToggleNew() {
    this.form_visible = !this.form_visible;
  }

  @action
  onCreate() {
    this.store.createRecord('group', {
      name: this.new_name,
    }).save();

    this._empty_form();
    this.args.onCreate();
  }

  @action
  onCancel() {
    this._empty_form();
  }

  _empty_form() {
    /*
    Resets the form to initial state
    */
    this.new_name = '';
    this.form_visible = false;
  }
}
