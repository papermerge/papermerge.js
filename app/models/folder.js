import NodeModel from './node';


export default class FolderModel extends NodeModel {

  get nodeType() {
    return 'folder';
  }
}
