import { attr } from '@ember-data/model';
import NodeModel from './node';


export default class DocumentModel extends NodeModel {
  @attr image;
  @attr lang;

  get nodeType() {
    return 'document';
  }
}
