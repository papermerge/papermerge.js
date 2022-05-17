import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { service } from '@ember/service';
import localStorage from 'papermerge/utils/localstorage';


export default class CommanderComponent extends Component {
  @service websockets;
  @service ws_nodes_move;
  @service store;
  @service requests;
  @service preferences;
  @service uploader;
  @service router;
  @service currentUser;
  @service notify;

  // show create new folder modal dialog?
  @tracked show_new_folder_modal = false;

  // show rename node modal dialog?
  @tracked show_rename_node_modal = false;

  @tracked show_confirm_deletion_modal = false;
  @tracked show_tags_modal = false;

  // localStorage is tracked
  @localStorage left_view_mode = 'list';
  @localStorage right_view_mode = 'list';

  @tracked selected_nodes = A([]);

  // new records created via New Folder or Upload Documents
  @tracked new_records = A([]);
  @tracked __new_record; // used as workaround for an ember bug

  @tracked deleted_records = A([]);
  @tracked __deleted_record; // used as workaround for an ember bug

  // data passed to `confirm_move_pages_modal` dialog.
  @tracked move_pages_modal_page_ids = A([]);
  @tracked move_pages_modal_dst_folder = undefined;
  @tracked show_confirm_move_pages_modal = false;

  constructor(owner, args) {
    super(owner, args);
    this.websockets.addHandler(this.messageHandler, this);
    this.preferences.load();
  }

  messageHandler(message) {
    let doc;

    doc = this.store.peekRecord('document', message.document_id);
    if (!doc) {
      console.warn(`Document ID=${message.document_id} not found.`);
      return;
    }

    switch (message.type) {
      case 'ocrdocumenttask.taskreceived':
        doc.ocr_status = 'received';
        break;
      case 'ocrdocumenttask.taskstarted':
        doc.ocr_status = 'started';
        break;
      case 'ocrdocumenttask.tasksucceeded':
        doc.ocr_status = 'succeeded';
        break;
      case 'ocrdocumenttask.taskfailed':
        doc.ocr_status = 'failed';
        this.notify.error(`Task failed ${message.error}`);
        break;
      }  // end of switch
  }

  @action
  openNewFolderModal() {
    this.show_new_folder_modal = true;
  }

  @action
  closeNewFolderModal(new_record) {
    this.new_records.push(new_record);
    this.__new_record = new_record; // workaround of ember bug
    this.show_new_folder_modal = false;
  }

  @action
  openRenameModal() {
    this.show_rename_node_modal = true;
  }

  @action
  onCloseRenameModal() {
    this.show_rename_node_modal = false;
    this.selected_nodes = A([]);
  }

  @action
  openConfirmDeletionModal() {
    this.show_confirm_deletion_modal = true;
  }

  @action
  closeConfirmDeletionModal(deleted_records) {
    this.show_confirm_deletion_modal = false;
    this.selected_nodes = A([]);
    this.deleted_records = this.deleted_records.concat(deleted_records);
    this.__deleted_records = deleted_records;
  }

  @action
  openTagsModal() {
    this.show_tags_modal = true;
  }

  @action
  onCreateDocumentModel(new_record) {
    /*
    Invoked by Upload component when new document model was created.

    Note that at this point in time, document's model is created
    on serverside, however file was not (or have not been?) uploaded yet.
    */
    this.new_records.push(new_record);
    this.__new_record = new_record; // workaround of ember bug
  }

  @action
  onDownloadNodes(selected_nodes) {
    return this.requests.downloadNodes(selected_nodes);
  }

  @action
  onViewModeChange(new_view_mode) {
    if (this.args.hint == 'left') {
      this.left_view_mode = new_view_mode;
    } else {
      this.right_view_mode = new_view_mode;
    }
  }

  @action
  onSelectionChanged(selected_nodes) {
    this.selected_nodes = selected_nodes;
  }

  @action
  onCheckboxChange({node, is_selected}) {
    /**
    Triggered whenever node's checkbox changes.

    `node` is an instance of Node model of whose
    selection state changed.

    `is_selected` - new selection state i.e. if user checked
    the checkbox then `is_selected` is true; if user unchecked
    the checkbox  then `is_selected` is false;
    */
    if (is_selected) {
      this.selected_nodes.pushObject(node);
    } else {
      this.selected_nodes.removeObject(node);
    }
  }

  @action
  onDrop({event, element}) {
    let data, files_list;
    const isNodeDrop = event.dataTransfer.types.includes('application/x.node');
    const isPageDrop = event.dataTransfer.types.includes('application/x.page');

    event.preventDefault();
    element.classList.remove('droparea');

    if (isNodeDrop) {
      // drop incoming from another panel
      data = event.dataTransfer.getData('application/x.node');
      if (data) {
        this.drop_callback({
          'application/x.node': JSON.parse(data)
        });
      }
    } else if (isPageDrop) {
      data = event.dataTransfer.getData('application/x.page');
      this.page_drop_callback(JSON.parse(data));
    } else if (this._is_desktop_drop(event)) {
      files_list = this._get_desktop_files(event);
      this.drop_callback({
        'application/x.desktop': files_list
      });
    }
  }

  _is_desktop_drop(event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    let items = event.dataTransfer.items;
    let files = event.dataTransfer.files;

    if (items && items.length > 0) {
      return true;
    }

    return files && files.length > 0;
  }

  _get_desktop_files(event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    let result = [], i;

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === 'file') {
          result.push(event.dataTransfer.items[i].getAsFile());
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (i = 0; i < event.dataTransfer.files.length; i++) {
        result.push(event.dataTransfer.files[i]);
      }
    }

    return result;
  }

  drop_callback(data) {
    /**
     * data is a dictionary of following format:
     * {
     *    'application/x.node': source_data
     *    'application/x.desktop': source_data
     * }
     *
     * (1) 'application/x.node' - when incoming data is a node
     * being dropped from another commander panel
     * (2) 'application/x.desktop' - when incoming data is being
     * drop from desktop's file manager
     *
     * In (1) case, source_data is {
     *  node: <node being droppped>
     *  source_parent: <parent of the node being droppped>
     * }
     *
     * In (2) case, source_data is an array of File instances
     * */
    let nodes_move_data,
      source_data;

    /*
      Data can be droppped from:
        - another panel i.e. as x.node
        - from desktop file manager i.e. as x.desktop
    */

    if (data['application/x.node']) {

      // dropping items from another panel
      source_data = data['application/x.node'];
      nodes_move_data = {
        'nodes': source_data.nodes,
        'source_parent': {
          'id': source_data.source_parent.id
        },
        'target_parent': {
          'id': this.args.node.id
        }
      }
      if (nodes_move_data.source_parent.id == nodes_move_data.target_parent.id) {
        console.log('Source same as target. Nothing to do.');
        return;
      }

      this.requests.nodesMove(nodes_move_data);
      if (nodes_move_data.source_parent.id == this.currentUser.user.inbox_folder.get('id')) {
        this.router.refresh();
      }

      if (nodes_move_data.target_parent.id == this.currentUser.user.inbox_folder.get('id')) {
        this.router.refresh();
      }

    } else if (data['application/x.desktop']) {
      // dropping items from the Desktop file manager
      this.uploader.upload({
        files: data['application/x.desktop'],
        node: this.args.node,
        lang: this.lang,
        on_create_doc_callback: this.onCreateDocumentModel
      });

    }
  }

  page_drop_callback(json_page_data) {
    let dst_folder;

    dst_folder = this.args.node;
    this.move_pages_modal_page_ids = json_page_data['pages'].map(
      page => page.id
    );
    this.move_pages_modal_dst_folder = dst_folder;
    this.show_confirm_move_pages_modal = true;
  }

  @action
  async onSubmitMovePages({dst, page_ids, single_page}) {
    await this.requests.moveToFolder({dst, page_ids, single_page});
    this.show_confirm_move_pages_modal = false;
    this.router.refresh();
  }

  @action
  async onSubmitTagsModal({tags, node}) {
    /*
    Update nodes tags.

    ``tags`` is an array of strings (tag names).
    ``node`` is node model.
    */
    let error_msg;

    this.requests.updateTagsOnNode({tags, node}).then(
      (response) => {
        if (response.status != 201) {
          error_msg = `Error url: ${response.url} `;
          error_msg += `status code: ${response.status} `;
          error_msg += `status text: ${response.statusText}`;
          this.notify.error(error_msg);
          this.show_tags_modal = false;
        } else {
          // success
          this.show_tags_modal = false;
          this.selected_nodes = A([]);
          this.router.refresh();
        }
      },
      (message) => {
        this.notify.error(message);
      }
    );
  }

  @action
  onCancelTagsModal() {
    this.show_tags_modal = false;
  }

  @action
  onDragEnter({event, element}) {
    event.preventDefault();
    element.classList.add('droparea');
  }

  @action
  onDragLeave({event, element}) {
    event.preventDefault();
    element.classList.remove('droparea');
  }

  @action
  onDragendCancel(model) {
    /**
      Action invoked when drag operation for a node (folder/document)
      was canceled. It is invoked on the SOURCE panel.

      `model` is instance of `model.document` or `model.folder`
    */
    console.log(`onDragendCancel on ${this.args.hint}: id=${model.id} type=${model.nodeType}`);
  }

  @action
  onDragendSuccess() {
    /**
      Action invoked when drag operation for one or multiple nodes
      succeeded. It is invoked on the SOURCE panel.
      `model` is instance of `model.document` or `model.folder`
    */
    this.selected_nodes = []; // reset currect selected nodes list
  }

  get view_mode() {
    if (this.args.hint == 'left') {
      return this.left_view_mode;
    }

    return this.right_view_mode;
  }

  get lang() {
    let _lang = this.preferences.get_value({
      key: 'ocr__language',
      default_value: 'deu'
    });

    return _lang;
  }

  get first_selected_node() {
    if (this.selected_nodes && this.selected_nodes[0]) {
      return this.selected_nodes[0];
    }

    return undefined;
  }

  get children() {
    /**
      Update children nodes (e.g. with newly added records) for better UX

      In order to provide better user experiece, when user creates new folders,
      uploads documents, deletes nodes (folder or documents) etc commander will
      show immediate effect of the action: newly created folder must be seen on
      same page as currenly user is in; even if we fetch again children, newly
      folder might not be visible to the user, as according to
      sorting/pagination creteria it(newly created folder) may not reside in
      current page.

      This is where current method comes handy - sticking with above example of
      newly created folder - this method will add newly created folder to the
      list of already existing children to make it visible to the user.
     */
    let children_copy = A(this.args.children);

    if (this.new_records.length > 0) {
      while(this.new_records.length > 0) {
        children_copy.unshift(
          this.new_records.pop()
        );
      }
    }
    if (this.deleted_records.length > 0) {
      children_copy = children_copy.filter(
        item => !this.deleted_records.includes(item)
      );
    }

    if (this.__new_record) { // workaround ember bug
      // Ember bug! Without this empty statement
      // updates on tracked attributes ``this.new_records``
      // will not trigger template updates i.e. ``this.children``
      //
      // pass
    }

    if (this.__deleted_record) {
      // similar to ``this.__new_record`` - it is used
      // here to help ember with tracking of ``this.deleted_records`` array
    }
    return children_copy;
  }

  get is_empty_folder() {
    return this.children.length === 0;
  }
}
