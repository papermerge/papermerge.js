import Route from '@ember/routing/route';

export default class FolderRoute extends Route {
  async model(params) {
    let response = await fetch(`/api/folder/${params.folder_id}.json`);
    let { data } = await response.json();

    return data.map((model) => {
      let { id, type, attributes } = model;
      return { id, type, ...attributes };
    });
  }
}
