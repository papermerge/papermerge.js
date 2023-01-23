import { attr } from '@ember-data/model';

import NodeModel from './node';


export default class FolderModel extends NodeModel {

  @attr breadcrumb;

  get nodeType() {
    return 'folder';
  }
}
