import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';
import { A } from '@ember/array';


export default class ViewerController extends Controller {

  @service currentUser;
  @service requests;
  @service websockets;

  @tracked extranode_id = null;
  @tracked extradoc_id = null;
  @tracked is_locked = false;
  @tracked ocr_status = null;

  @tracked _document_versions = A([]);
  @tracked __document_versions__;

  @tracked _pages = A([]);
  @tracked __pages__;

  queryParams = ['extranode_id', 'extradoc_id']


  constructor(owner, args) {
    super(owner, args);

    this.websockets.addHandler(this.messageHandler, this);
  }

  update_document() {
    /*
     Pulls latest document version + document version's pages
     from server side.
     */
    let last_version,
      page_adapter,
      that = this;

    page_adapter = this.store.adapterFor('page');

    this.store.findRecord(
      'document',
      this.model.doc.id,
      { reload: true }
    ).then((doc) => {
      last_version = doc.last_version;
      that._document_versions.push(last_version);
      that.__document_versions__ = last_version;

      page_adapter.loadImages(last_version.pages, 'image/svg+xml').then(
        (pages) => {
          that._pages = pages;
          that.__pages__ = pages;
      });
    });
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
        this.update_document();
        break;
      case 'ocrdocumenttask.taskfailed':
        this.ocr_status = 'failed';
        break;
      }  // end of switch
  }

  @action
  async onPanelToggle() {
    let home_folder;

    if (this.extranode_id) {
      this.extranode_id = null;
    } else {
      home_folder = await this.currentUser.user.home_folder;
      this.extranode_id = home_folder.get('id');
    }
  }

  @action
  onRunOCR() {
    this.is_locked = true;
    this.requests.runOCR({
      doc_id: this.model.doc.id,
      lang: 'deu'
    });
  }

  get document_versions() {
    /**
    Returns document versions received via this.model.document_versions + additional
    versions created via OCRing.

    The point here is to update versions dropdown with newly
    created versions (when user clicks run OCR).
    */
    if (this.__document_versions__) {
      // workaround for tracking changes in array
    }

    if (this._document_versions.length > 0) {
      // include newly OCRed versions as well
      return this.model.document_versions.concat(
        this._document_versions
      );
    }

    return this.model.document_versions;
  }

  get pages() {

    if (this.__pages__) {
      // workaround for tracking changes in array
    }

    if (this._pages.length > 0) {
      // If newer version of the pages is available
      // (e.g. document was OCRed) then just use it
      return this._pages;
    }

    // Initial version of the pages
    return this.model.pages;
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
