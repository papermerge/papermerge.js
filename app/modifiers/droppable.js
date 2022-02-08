import { action } from '@ember/object';
import Modifier from 'ember-modifier';


export default class DrappableModifier extends Modifier {

  addEventListener() {
    this.element.addEventListener('drop', this.onDrop);
    this.element.addEventListener('dragover', this.onDragOver);
    this.element.addEventListener('dragenter', this.onDragEnter);
    this.element.addEventListener('dragleave', this.onDragLeave);
  }

  removeEventListener() {
    this.element.removeEventListener('drop', this.onDrop);
    this.element.removeEventListener('dragover', this.onDragOver);
    this.element.removeEventListener('dragenter', this.onDragEnter);
    this.element.removeEventListener('dragleave', this.onDragLeave);
  }

  // lifecycle hooks
  didReceiveArguments() {
    this.removeEventListener();
    this.addEventListener();
  }

  willDestroy() {
    this.removeEventListener();
  }

  @action
  onDrop(event) {
    let data, files_list;
    const isNodeDrop = event.dataTransfer.types.includes("application/x.node");
    const callback = this.args.named['onDrop'];

    event.preventDefault();
    this.element.classList.remove('droparea');

    if (isNodeDrop && callback) {
      // drop incoming from another panel
      data = event.dataTransfer.getData('application/x.node');
      if (data) {
        callback({
          'application/x.node': JSON.parse(data)
        });
      }
    } else if (this._is_desktop_drop(event)) {
      files_list = this._get_desktop_files(event);
      callback({
        'application/x.desktop': files_list
      });
    }

  }

  @action
  onDragOver(event) {
    const isNode = event.dataTransfer.types.includes("application/x.node");

    event.preventDefault();
    if (isNode) {
      //console.log(`dragging over a node`);
    }
  }

  @action
  onDragEnter(event) {
    event.preventDefault();
    this.element.classList.add('droparea');
  }

  @action
  onDragLeave(event) {
    event.preventDefault();
    this.element.classList.remove('droparea');
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
}
