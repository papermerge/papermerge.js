import { attr } from '@ember-data/model';
import NodeModel from './node';

export default class DocumentModel extends NodeModel {
  @attr image;

  get type() {
    return 'document';
  }

  get is_folder() {
    return false;
  }

  get is_document() {
    return true;
  }
}
