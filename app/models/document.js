import { attr } from '@ember-data/model';
import NodeModel from './node';


export default class DocumentModel extends NodeModel {
  @attr image;
  @attr lang;
  @attr ocr;
  @attr breadcrumb;
  @attr ocr_status;
  // `versions` is an Array of DocumentVersion(s)
  @attr versions; // of type DocumentVersion

  get nodeType() {
    return 'document';
  }

  get last_version() {
    let last_ver = undefined;

    if (this.versions) {
      last_ver = this.versions.reduce((prev, current) => {
        return (prev.number > current.number) ? prev : current
      });
    }

    return last_ver;
  }
}
