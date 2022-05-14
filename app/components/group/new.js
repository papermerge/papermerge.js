import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';


export default class NewGroupComponent extends Component {
  @service store;
  @service notify;
  @tracked form_visible = false;
  @tracked new_name = '';

  @action
  onToggleNew() {
    this.form_visible = !this.form_visible;
  }

  @action
  onCreate() {
    let that = this;

    this.store.createRecord('group', {
      name: this.new_name,
    }).save().catch(function(data) {
      let errors;

      errors = data.errors.map(item => item.detail);
      that.notify.error(errors);
    });

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
