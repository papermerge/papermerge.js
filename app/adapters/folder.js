import ApplicationAdapter from './application';


export default class FolderAdapter extends ApplicationAdapter {

  urlForCreateRecord() {
    let ret = this.buildURL('nodes');
    return ret;
  }
}
