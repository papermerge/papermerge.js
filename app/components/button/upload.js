import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';


export default class UploadButtonComponent extends Component {
  /*
    Component which takes care of uploading documents to the server.
    Takes only one argument - parental node of the uploaded documents.

    Example of usage:

      <Button::Upload @node={{@node}} />
  */
  @service store;
  @service uploader;

  @action
  onClickProxyUpload() {
    /* Proxy click event to real input[type=file] element
    */
    let element = document.querySelector('input[type=file]');

    if (element) {
      element.click();
    } else {
      console.error('input[type=file] element not found');
    }
  }

  @action
  onUploadChange(event) {
    let files;

    files = event.target.files;

    if (!files) {
      console.error('Empty array for uploaded files');
      return;
    }

    this.uploader.upload({
      files: files,
      lang: this.args.lang,
      node: this.args.node,
      on_create_doc_callback: this.args.onCreateDocumentModel
    });

  }
}
