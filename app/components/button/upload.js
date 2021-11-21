import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class UploadButtonComponent extends Component {
  /*
    Component which takes care of uploading documents to the server.
    Takes only one argument - parental node of the uploaded documents.

    Example of usage:

      <Button::Upload @node={{@node}} />
  */
  @service store;

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

    Array.from(files, (file) => {
      /* Upload of documents to the server side is two stage process:
        (1.) create document model on the server side
        (2.) upload file and associated it with model created in (1.)
       */
      this._createDocumentModel({
        file: file,
        node: this.args.node,
        lang: "deu"
      }).then((doc) => {
        // notify commander component so that it
        // can already show new document model to the user
        this.args.onCreateDocumentModel(doc);
        // continue with actual file upload
        this._uploadFile({doc, file});
      });

    });
  }

  async _createDocumentModel({file, node, lang}) {
    /*
      Creates document model on the server side.

      This will create, on the server side, the document model
      with specified `lang`, `title`, `parent_id` attribute.
      Server side will take care of associating it to the correct user.
      It is important to understand that NO FILE UPLOAD happens
      in this method. Because there is no file uploaded at this stage,
      server side document model will be created with
       `size` and `page_count` attributes set to zero i.e.

        size = 0
        page_count = 0
    */
    let new_doc;

    new_doc = this.store.createRecord('document');
    new_doc.title = file.name;
    new_doc.parent = node;
    new_doc.lang = lang;

    return new_doc.save();
  }

  _uploadFile({file, doc}) {
    /*
      Uploads given file for given document model.

      Document model ``doc`` should exist on the server side.
    */
    let doc_adapter = this.store.adapterFor('document');


    doc_adapter.uploadFile({file, doc});
  }

}