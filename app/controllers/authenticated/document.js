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
  @tracked is_locked = false;
  @tracked ocr_status = null;

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
    if (message.document_id != this.model.doc.id) {
      // this websocket message was not addressed to currently
      // viewed document. Just skip it.
      return;
    }

    // message addressed to currently viewed document
    switch (message.type) {
      case 'ocrdocumenttask.taskreceived':
        this.ocr_status = 'received';
        break;
      case 'ocrdocumenttask.taskstarted':
        this.ocr_status = 'started';
        break;
      case 'ocrdocumenttask.tasksucceeded':
        this.ocr_status = 'succeeded';
        this.is_locked = false;
        //to do: retrieve again
        // 1. document versions
        // 2. document pages
        break;
      case 'ocrdocumenttask.taskfailed':
        this.ocr_status = 'failed';
        break;
      }  // end of switch
  }

  @action
  onRunOCR() {
    this.is_locked = true;
    this.requests.runOCR({
      doc_id: this.model.doc.id,
      lang: 'deu'
    });
  }

  get isLocked() {
    return this.is_locked;
  }

  get ocrStatus() {
    /*
    ocr status as received from:

    1. websockets' messages for current document model
    2. model itself

    The notifications received via websockets's messages (1.) have priority
    over current document model (2.)

    Initially `this.ocr_status` will be `null` which will result in displaying
    the actual ocr status from `this.model.doc.ocr_status`. If user chooses
    to run OCR, the controller `this.ocr_status` will be updated in realtime
    to non-null value (via websockets) and accordingly `this.ocr_status` will
    take over in terms of priority.
    */
    return this.ocr_status || this.model.doc.ocr_status;
  }
}
