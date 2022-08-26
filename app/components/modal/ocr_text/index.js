import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';


export default class OCRTextComponent extends Component {

  get title() {
    if (this.ocred_text.isRunning) {
      return 'Loading...';
    }

    if (this.args.node) {
      return `${this.args.node.title} OCRed Text`;
    }

    return 'noname';
  }

  get ocred_text() {
    return this.args.getOcrText;
  }

  get ocred_text_result() {
    return this.args.ocred_text_result;
  }

  @action
  onClose() {
    this.args.onClose();
  }

}
