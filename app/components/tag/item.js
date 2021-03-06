import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';


export default class TagItemComponent extends Component {

  _ensure_safe_html_color(value, default_value) {
    /*
    make sure we use '#rrggbb' format strings here
    */

    if (this._is_valid_color(value)) {
      return value;
    }

    // if not a valid color format here,
    // just return a (safe) default value for that color

    return default_value;
  }

  _is_valid_color(value) {
    if (!value) {
      return false;
    }
    // TODO: use regexp here
    return value.length === 7 && value[0] === '#';
  }

  get bg_color() {
    return this._ensure_safe_html_color(
      this.args.bg_color || this.args.tag.bg_color,
      '#c41fff'
    );
  }

  get fg_color() {
    return this._ensure_safe_html_color(
      this.args.fg_color || this.args.tag.fg_color,
      '#ffffff'
    );
  }

  get name() {
    if (this.args.tag) {
      return this.args.tag.name;
    }

    return this.args.name;
  }

  get inlineStyle() {
    let _style;

    _style = `background-color: ${this.bg_color}; color: ${this.fg_color}`

    return htmlSafe(_style);
  }
}