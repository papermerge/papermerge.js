import Route from '@ember/routing/route';

export default class FolderRoute extends Route {
  async model(params) {
    let url, response, nodes;

    if (params.folder_id) {
      url = `/api/folder/${params.folder_id}`;
    } else {
      url = '/api/folder/';
    }
    response = await fetch(url);

    nodes = await response.json();

    return { nodes };
  }
}
