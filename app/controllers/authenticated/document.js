import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';


export default class ViewerController extends Controller {

  @service currentUser;
  @service requests;
  @service websockets;

  @tracked extranode_id = null;
  @tracked extradoc_id = null;
  @tracked is_ocred = false;

  queryParams = ['extranode_id', 'extradoc_id']


  constructor(owner, args) {
    super(owner, args);

    this.websockets.addHandler(this.messageHandler, this);
  }

  @action
  onPanelToggle() {

    if (this.extranode_id) {
      this.extranode_id = null;
    } else {
      // TODO: get home folder ID from this.currentUser;
      this.extranode_id = 75;
    }
  }

  messageHandler(message) {
    // console.log(message);
    if (message.type == 'ocrdocumenttask.tasksucceeded' ) {
      if (message.document_id == this.model.doc.id) {
        this.is_ocred = false;
        //to do: retrieve again
        // 1. document versions
        // 2. document pages
      }
    }
  }

  @action
  onRunOCR() {
    this.is_ocred = true;
    this.requests.runOCR({
      doc_id: this.model.doc.id,
      lang: 'deu'
    });
  }

  get isLocked() {
    return this.is_ocred;
  }
}
