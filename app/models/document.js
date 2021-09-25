import { attr } from '@ember-data/model';
import NodeModel from './node';

export default class DocumentModel extends NodeModel {
  @attr image;

  get type() {
    return 'document';
  }
}
