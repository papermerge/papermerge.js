import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const COLORS = [
  '#ff0000',
  '#0000ff',
  '#006684',
  '#661200',
  '#ce5c00',
  '#5c3566',
  '#4e9a06',
];

function _random_color() {
  /*
    Returns a random color string from `COLORS` array.

    Color strings are RGB strings like for
    example "#ff0000", "#ff7892", "#ffffff"
  */
  let index = Math.floor(Math.random() * COLORS.length);

  return COLORS[index];
}

export default class NewTagComponent extends Component {
  /*
  Component to create new tag.

  It consists from a button labeled 'new' which
  when clicked will toggle a 'new tag' form.
  */

  @service store;

  // initially only 'new' button is visible
  @tracked form_visible = false;
  @tracked new_name = '';
  @tracked new_description = '';
  @tracked new_pinned = false;
  @tracked new_fg_color = '#ffffff';
  @tracked new_bg_color = _random_color();

  @action
  onToggleNew() {
    this.form_visible = !this.form_visible;
  }

  @action
  onCreate() {
    this.store
      .createRecord('tag', {
        name: this.new_name,
        description: this.new_description,
        pinned: this.new_pinned,
        bg_color: this.new_bg_color,
        fg_color: this.new_fg_color,
      })
      .save();

    this._empty_form();
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
    this.new_description = '';
    this.new_fg_color = '#ffffff';
    this.new_bg_color = _random_color();
    this.new_pinned = false;
    this.form_visible = false;
  }
}
