import ApplicationAdapter from './application';


export default class FolderAdapter extends ApplicationAdapter {

  findFolder(folder_id) {
    let url, ret;

    if (!folder_id) {
      console.log('FolderAdapter: folder_id is empty.');
      return;
    }

    url = this.buildURL('folders', folder_id);

    return this.ajax(url, 'GET').then((folder) => {
      this.store.pushPayload('folder', folder);
      ret = this.store.peekRecord('folder', folder.data.id);
      return ret;
    });
  }
}
