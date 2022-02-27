import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { service } from '@ember/service';


export default class CommanderComponent extends Component {
  /*
    Arguments:

    @node = current node/folder
    @extranode = extract node to display (on second panel)
    @hint = "left" | "right" indicates which of two sides
    is current panel displayed. @hint is "left" indicates that
    commander is displayed in left panel.
  */

  @service websockets;
  @service ws_nodes_move;
  @service store;
  @service requests;
  @service preferences;
  @service uploader;

  // show create new folder modal dialog?
  @tracked show_new_folder_modal = false;

  // show rename node modal dialog?
  @tracked show_rename_node_modal = false;

  @tracked show_confirm_deletion_modal = false;

  // nodes are displayed as list or as grid?
  @tracked view_mode = 'list';

  @tracked selected_nodes = A([]);

  // new records created via New Folder or Upload Documents
  @tracked new_records = A([]);
  @tracked __new_record; // used as workaround for an ember bug

  @tracked deleted_records = A([]);
  @tracked __deleted_record; // used as workaround for an ember bug

  constructor(owner, args) {
    super(owner, args);

    this.websockets.addHandler(this.messageHandler, this);
    this.ws_nodes_move.addHandler(this.wsNodesMoveHandler, this);
    this.preferences.load();
  }

  wsNodesMoveHandler(message) {
    if (message.type === 'nodesmove.tasksucceeded') {
      if (this.args.node.id == message.source_parent['id']) {
        this._substract_nodes(message.nodes.map(node => node.id));
      } else if (this.args.node.id == message.target_parent['id']) {
        this._add_nodes(message.nodes.map(node => node.id));
      }
    }
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
        break;
      }  // end of switch
  }

  _substract_nodes(node_ids) {
    let that = this, doc;

    node_ids.forEach(node_id => {
      // maybe document ?
      doc = that.store.peekRecord('document', node_id);
      if (doc) {
        that._substract_node(doc);
      }
      // maybe folder ?
      doc = that.store.peekRecord('folder', node_id);
      if (doc) {
        that._substract_node(doc);
      }
    });
  }

  _substract_node(node) {
    this.deleted_records.push(node);
    this.__deleted_record = node;
    this.selected_nodes = [];
  }

  _add_nodes(node_ids) {
    let that = this, doc;

    node_ids.forEach(node_id => {
      // maybe document ?
      doc = that.store.peekRecord('document', node_id);
      if (doc) {
        that._add_node(doc);
      }
      // maybe folder ?
      doc = that.store.peekRecord('folder', node_id);
      if (doc) {
        that._add_node(doc);
      }
    });
  }

  _add_node(doc) {
    this.new_records.push(doc);
    this.__new_record = doc;
  }

  @action
  onNodeClicked() {
    /**
     * Whenever a folder is clicked reset selected node list
     *
     * Otherwise user will see (newly opened) folder with no
     * selected nodes - but with visible action buttons (delete, download...)!
     * */
    this.selected_nodes = A([]);
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
  closeRenameModal() {
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
    this.view_mode = new_view_mode;
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
  async onDrop(data) {
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
        'nodes': [{ 'id': source_data.node.id }],
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
  onDragendSuccess(model) {
    /**
      Action invoked when drag operation for a node (folder/document)
      succeeded. It is invoked on the SOURCE panel.

      `model` is instance of `model.document` or `model.folder`
    */
    console.log(`onDragendSuccess on ${this.args.hint}: id=${model.id} type=${model.nodeType}`);
  }

  get lang() {
    let _lang = this.preferences.get_value({
      key: 'ocr__language',
      default_value: 'deu'
    });

    return _lang;
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
}
