import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { task } from 'ember-concurrency';
import {
  reposition_items,
  is_permuted
} from 'papermerge/utils/array';


export default class ViewerComponent extends Component {
  /*
  Document Viewer Component

  Arguments:
    @doc - `models.document` instance - the backend model document currently
      shown to the user by this component
    @pages - an array of `models.page` instances. Besides, each page
    instance has either `url` or `svg_image` attribute.
  */

  @service websockets;
  @service store;
  @service requests;
  @service notify;
  @service router;

  @tracked ocr_status = null;
  @tracked is_locked = false;

  @tracked _document_versions = A([]);
  @tracked __document_versions__;

  @tracked _pages = A([]);
  @tracked __pages__;

  @tracked selected_pages = A([]);
  @tracked show_confirm_pages_deletion_modal = false;
  @tracked show_confirm_document_delete_modal = false;
  @tracked show_confirm_document_merge_modal = false;
  @tracked show_rename_node_modal = false;
  @tracked page_order_changed = false;
  @tracked apply_page_order_changes_in_progress = false;
  // extract page = document -> folder
  @tracked show_extract_pages_modal = false;
  // move page = document -> document
  @tracked show_move_pages_modal = false;

  initial_pages_memo = A([]);

  constructor(owner, args) {
    super(owner, args);

    this.websockets.addHandler(this.messageHandler, this);
  }

  messageHandler(message) {
    // console.log(message);
    if (message.document_id != this.args.doc.id) {
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

  update_document() {
    /*
     Pulls latest document version + document version's pages
     from server side.
     */
    let last_version,
      that = this;

    this.store.findRecord(
      'document',
      this.args.doc.id,
      { reload: true }
    ).then((doc) => {
      last_version = doc.last_version;

      that.__pages__ = that._pages = last_version.pages.map(
        (page) => this.requests.loadImage.perform(page, 'image/svg+xml')
      );
    });
  }

  get extract_pages_modal_dst_folder() {
    return "blah";
  }

  @action
  onRunOCR() {
    this.is_locked = true;
    this.requests.runOCR({
      doc_id: this.args.doc.id,
      lang: 'deu'
    });
  }

  @action
  async onRotateClockwise(angle) {
    let page_ids = [];

    page_ids = this.selected_pages.map(page => page.id);
    this.requests.rotatePages({page_ids, angle}).then(
      () => { // on success
        this.selected_pages = A([]);
        this.router.refresh();
      },
      (message) => { // on error
        this.notify.error(message);
      }
    );
   }

  @action
  onNodeClicked() {
  }

  @action
  onThumbnailCheckboxChange({page, is_selected}) {
    if (is_selected) {
      this.selected_pages.pushObject(page);
    } else {
      this.selected_pages.removeObject(page);
    }
  }

  @action
  onThumbnailsPositionChanged(page_ids) {
    /*
    ``page_ids`` will be moved to the new position
    indicated by drop placeholder.
    Page is drop placeholder if ``page.is_drop_placeholder`` is true.
    */
    let pages_without_placeholder,
      drop_placeholder_pos;

    // learn where user wants to move pages by
    // findind drop placeholder position
    drop_placeholder_pos = this.pages.findIndex(
      item => item.is_drop_placeholder
    );

    // Remove placeholder from pages array
    // but only if drop placeholder is there/was found
    if (drop_placeholder_pos >= 0) {
      this.pages.splice(drop_placeholder_pos, 1);
      pages_without_placeholder = this.pages;

      // reposition pages
      this.pages = reposition_items({
        items: pages_without_placeholder,
        selected_ids: page_ids,
        drop_pos: drop_placeholder_pos
      });
    }
  }

  @action
  onAddThumbnailPlaceholderAt(pos) {
    let new_pages,
      drop_placeholder;

    new_pages = Array.from(this.pages);
    drop_placeholder = {'is_drop_placeholder': true};

    if (!new_pages.find(item => item.is_drop_placeholder)) {
      // Only one drop placeholder is allowed
      new_pages.splice(pos, 0, drop_placeholder);
      this.pages = new_pages;
    }
  }

  @action
  onRemoveThumbnailPlaceholder() {
    let new_pages,
      drop_placeholder_pos;

    new_pages = Array.from(this.pages);
    drop_placeholder_pos = new_pages.findIndex(item => item.is_drop_placeholder);

    if (drop_placeholder_pos >= 0) {
      new_pages.splice(drop_placeholder_pos, 1);
      this.pages = new_pages;
    }
  }

  @action
  async onIncomingPages({page_ids, drop_pos}) {

    this.requests.moveToDocument({
      dst: this.args.doc.id,
      pages: page_ids,
      position: drop_pos
    }).then(() => {
      this._pages = [];
      this.router.refresh();
      this.notify.info("Page(s) moved successfully");
    });
  }

  @action
  openConfirmDeletionModal() {
    this.show_confirm_pages_deletion_modal = true;
  }

  @action
  openConfirmDeleteDocumentModal() {
   this.show_confirm_document_delete_modal = true; 
  }

  @action
  openConfirmMergeDocumentModal() {
   this.show_confirm_document_merge_modal = true; 
  }

  @action
  openRenameDocumentModal() {
    this.show_rename_node_modal = true;
  }

  @action
  openExtractPagesModal() {
    this.show_extract_pages_modal = true;
  }

  @action
  openMovePagesModal() {
    this.show_move_pages_modal = true;
  }

  @action
  onCloseRenameModal() {
    this.show_rename_node_modal = false;
  }

  @task *onSubmitExtractPages({
    page_ids,
    target_folder,
    single_page,
    title_format
  }) {
    let result = yield this.requests.moveToFolder({
      dst: target_folder,
      page_ids: page_ids,
      single_page: single_page,
      title_format: title_format
    });

    if (result.status >= 400) {
      return "There was an issue. Extraction aborted.";
    } else {
      this.show_extract_pages_modal = false;
    }

    this.selected_pages = A([]);
    this._dual_refresh();
  }

  @task *onSubmitMovePages({
    page_ids,
    target_doc,
    position,
    merge
  }) {
    let result = yield this.requests.moveToDocument({
      dst: target_doc,
      page_ids: page_ids,
      position: position,
      merge: merge
    });

    if (result.status >= 400) {
      return "There was an issue. Extraction aborted.";
    } else {
      this.show_move_pages_modal = false;
    }

    this.selected_pages = A([]);
  }

  @action
  async submitConfirmDeletionModal() {
    let page_ids = [];

    page_ids = this.selected_pages.map(page => page.id);
    this.requests.deletePages(page_ids).then(() => {
      this.show_confirm_pages_deletion_modal = false;
      this.selected_pages = A([]);
      this.router.refresh();
      this.notify.info('Page(s) deleted successfully');
    });
  }

  @task *submitConfirmDocumentDeleteModal() {

    let doc_id, // id of the document to be deleted (current one)
      parent_id, // parent of the document
      result;

    doc_id = this.args.doc.get('id');
    parent_id = this.args.doc.parent.get('id');

    result = yield this.requests.deleteDocument(doc_id);
    this.show_confirm_document_delete_modal = false;
    // redirect to parent node
    this.router.replaceWith(
      'authenticated.nodes',
      parent_id
    );
  }

  @action
  async onPageOrderApply() {
    this.apply_page_order_changes_in_progress = true;
    this.requests.reorderPagesApply({
      old_items: this.initial_pages_memo,
      new_items: this.pages
    }).then(
      () => { // on success
        this.apply_page_order_changes_in_progress = false;
        this.notify.info(
          'New page order successfully applied'
        );
        this.page_order_changed = false;
        this.router.refresh();
      },
      () => { // on failure
        this.apply_page_order_changes_in_progress = false;
        this.notify.error(
          'There was a problem while saving new page order'
        );
        this.page_order_changed = false;
      }
    );
  }

  @action
  onPageOrderDiscard() {
    this._pages = this.initial_pages_memo;
    this.page_order_changed = false;
  }

  get versions() {
    /* Just a shortcut */
    return this.args.doc.versions;
  }

  get document_versions() {
    /**
    Returns document versions received via this.args.doc.versions + additional
    versions created via OCRing.

    The point here is to update versions dropdown with newly
    created versions (when user clicks run OCR).
    */
    if (this.__document_versions__) {
      // workaround for tracking changes in array
    }

    if (this._document_versions.length > 0) {
      // include newly OCRed versions as well
      return this.versions.concat(
        this._document_versions
      );
    }

    return this.versions;
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
    return this.args.pages;
  }

  set pages(new_arr) {
    // remember initial page order

    if (this.initial_pages_memo.length == 0) {
      this.initial_pages_memo = this.pages;
    }

    this.page_order_changed = is_permuted(
      this.initial_pages_memo,
      new_arr
    );

    // assign new page order
    this._pages = new_arr;
  }

  get ocrStatus() {
    /*
    ocr status as received from:

    1. websockets' messages for current document model
    2. model itself

    The notifications received via websockets's messages (1.) have priority
    over current document model (2.)

    Initially `this.ocr_status` will be `null` which will result in displaying
    the actual ocr status from `this.args.doc.ocr_status`. If user chooses
    to run OCR, the controller `this.ocr_status` will be updated in realtime
    to non-null value (via websockets) and accordingly `this.ocr_status` will
    take over in terms of priority.
    */
    return this.ocr_status || this.args.doc.ocr_status;
  }

  get isLocked() {
    return this.is_locked;
  }

  get has_page_order_changes() {
    return this.ordered_pages_change.has_changes;
  }

  _dual_refresh() {
    // refresh primary panel
    this.router.refresh();

    // the whole point of this uglyness is to refresh secondary panel.
    // Secondary panel can be either commander or viewer.
    if (this.args.hint == 'left') {
      // Current viewer is on the 'left' side.
      // This means that secondary panel to refresh is on the 'right'
      // side (primary panel is refreshed by this.router.refresh()).
      // Current template is ``authenticated/document.hbs``.
      this.args.onNodeClicked.perform(
        this.args.extra_id,
        'right', // perform reload of secondary panel
        'folder' // panel = commander
      );
    } else {
      // Current viewer is on the 'right' side.
      // Secondary panel to refresh is on the 'left' side.
      // Current template may be either ``authenticated/nodes.hbs``
      // or ``authenticated/document.hbs``.
      this.args.onNodeClicked.perform(
        this.args.doc.id,
        'right', // perform reload of secondary panel
        'doc' // panel = viewer
      );
    }
  }
}
