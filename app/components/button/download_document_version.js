import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class ButtonDownloadComponent extends Component {

  @service requests;

  @action
  download(document_version) {
    /*
      `document_version` contains following attributes:
        id
        number
        file_name
        lang
        pages
        size
        page_count
        short_description

      attributes which correspond to server side (or client side) DocumentVersion model
    */
    this.requests.downloadDocumentVersion(
      document_version
    );
  }
}

