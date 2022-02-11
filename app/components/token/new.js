import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';


export default class NewTokenComponent extends Component {
  /*
  Component to create new token.

  It consists from a button labeled 'new' which
  when clicked will toggle a 'new token' form.
  */

  new_expiry_numeric = 1;
  new_expiry_scale = 1;
  @service store;

  // initially only 'new' button is visible
  @tracked form_visible = false;
  @tracked message_with_token;

  @action
  onToggleNew() {
    this.form_visible = !this.form_visible;
  }

  get new_expiry() {
    /*
    Returns token expiry value, in hours.
    */
    let numeric, scale;

    // the numeric value e.g. 3
    numeric = parseInt(this.new_expiry_numeric);
    // when user chooses hours, scale := 1
    // when user chooses days, scale := 24
    // when user chooses months, scale := 744
    scale = parseInt(this.new_expiry_scale);

    return numeric * scale;
  }

  @action
  onCreate() {
    let that = this;

    this.store.createRecord('token', {
        expiry_hours: this.new_expiry
      }).save().then(model => {
        let msg;

        msg = "Please remember the token as it won't be displayed again: ";
        msg += model.token;

        that.message_with_token = msg;
      });

    this._empty_form();
  }

  @action
  onCancel() {
    this._empty_form();
  }

  @action
  onNumericChange(event) {
    this.new_expiry_numeric = parseInt(event.target.value);
  }

  @action
  onScaleChange(event) {
    this.new_expiry_scale = parseInt(event.target.value);
  }

  _empty_form() {
    /*
    Resets the form to initial state
    */
    this.new_expiry_scale = 1;
    this.new_expiry_numeric = 1;
    this.form_visible = false;
  }
}
