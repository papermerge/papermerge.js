import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class ViewComponent extends Component {

  @service requests;
  @service websockets;

  constructor(owner, args) {
    super(owner, args);

    this.websockets.addHandler(this.messageHandler, this);
  }

  messageHandler(message) {
    console.log(message);
  }

  @action
  onRunOCR() {
    this.requests.runOCR({
      doc_id: this.args.doc.id,
      lang: 'deu'
    });
  }
}