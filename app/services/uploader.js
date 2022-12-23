import Service from '@ember/service';
import { service } from '@ember/service';


export default class Uploader extends Service {

  @service requests;
  @service store;
  @service notify;

  upload({files, lang, node, on_create_doc_callback}) {
    Array.from(files, (file) => this.upload_file({
      file, node, lang, on_create_doc_callback
    }));
  }

  upload_file({file, lang, node, on_create_doc_callback}) {
    /* Upload of documents to the server side is two stage process:
      (1.) create document model on the server side
      (2.) upload file and associated it with model created in (1.)
    */
    this._createDocumentModel({file, node, lang}).then((doc) => {
      // notify commander component so that it
      // can already show new document model to the user
      on_create_doc_callback(doc);
      // continue with actual file upload
      this._uploadFile({doc, file});
    }).catch((err_response) => {
      let message = "", error;

      for (let i = 0; i < err_response.errors.length; i++) {
        error = err_response.errors[i];
        message += `${error.code} - ${error.detail}`;
      }
      this.notify.error(message);
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