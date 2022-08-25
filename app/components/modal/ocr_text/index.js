import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';


export default class OCRTextComponent extends Component {

  get title() {
    if (this._title === undefined) {
      return this.default_title;
    }

    return this._title;
  }

  get default_title() {
    if (this.node) {
      return this.node.title;
    }

    return 'noname';
  }

  get node() {
    return this.args.node;
  }

  get ocred_text() {
    return this.args.getOCRedtext;
  }

  @action
  onClose() {
    this.args.onClose();
  }

}
